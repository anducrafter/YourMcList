import { prisma } from '@/lib/actions/prisma';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { sendVotifierVote } from "minecraft-toolkit";


interface VotifierResult {
  acknowledged: boolean;
  version: string;
  protocol: string;
}


async function handleVote(mcname: string, ip: string, server: any) {
  // Initialize as null or with a default "failed" state
  let result: VotifierResult | null = null;

  try {
    // TypeScript will now know 'result' matches the VotifierResult interface
    result = await sendVotifierVote({
      host: server?.voteip || "",
      port: 8192,
      publicKey: server?.votekey || "",
      serviceName: "YourMcList",
      username: mcname,
      address: ip,
      token: server?.votekey || "",
      protocol: "auto",
    }) as VotifierResult;

    console.log(`Success! Protocol: ${result.protocol}`);
    
  } catch (error: unknown) {
    // In TS, 'error' is 'unknown' by default in catch blocks
    if (error instanceof Error) {
      // Handles standard Errors and MinecraftToolkitError
      console.error(`Votifier failed: ${error.message}`);
    } else {
      console.error("An unexpected non-error object was thrown", error);
    }

    // Optional: set a failed state for the rest of your logic
    result = { acknowledged: false, version: "unknown", protocol: "failed" };
  }

  return result;
}


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData(); // Use await here!
    const mcname = formData.get('mcname');
    const serverId = formData.get('serverId');
    const headerList = await headers();
  const ip = headerList.get('x-forwarded-for') || 'unknown';
if (!mcname || typeof mcname !== "string"  ) {
    return  NextResponse.json({message: 'Username is not valid'})
  }
  if(!serverId || typeof serverId !== "string"){
     return  NextResponse.json({message: 'serverip is not valid'})
  }

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const lastVote = await prisma.vote.findFirst({
    where: {
      OR: [
        { username: mcname },
        { ipAddress: ip }
      ],
      // Only look for votes created AFTER 24 hours ago
      createdAt: {
        gt: twentyFourHoursAgo,
      },
    },
  });

  // If lastVote exists, it means they voted within the last 24 hours
  if (lastVote) {
    return NextResponse.json({ canVote: false, message: "You can only vote once every 24 hours." });
  }

  
  // If there's a list of IPs (proxies), take the first one
  ip.split(',')[0];
  
    const addvote = await prisma.vote.create({
        data:{
            username: mcname,
            ipAddress: ip,
            serverId: serverId,
        },
    })
    const server = await prisma.mcServer.findUnique({
      where: {
        serverid: serverId
      }
    })
    handleVote(mcname,ip,server)
    // LOGIC CHECK: 
    // If you are doing: await fetch('/') <- THIS CAUSES YOUR ERROR.
    // Instead, do your database logic directly here.

    return NextResponse.json({ message: `Voted for ${serverId} as ${mcname}` });
  } catch (err) {
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
  }
}