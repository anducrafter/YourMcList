import { bedrockProtocolMajor, javaProtocolMap } from '@/app/compoments/protocol';
import { auth } from '@/auth';
import { prisma } from '@/lib/actions/prisma';
import { Prisma } from '@/lib/generated/prisma/client'
import { error } from 'console';
import { turborepoTraceAccess } from 'next/dist/build/turborepo-access-trace';
import { redirect } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server'
 
export async function POST(_req: NextRequest,) {

  const session = await auth();
   const formData = await _req.formData()
const serveripRaw = formData.get("serverip");
if (!serveripRaw || serveripRaw.toString().trim() === "") {
  throw new Error("serverip missing");
}

let serverip = serveripRaw.toString().trim();

const portRaw = formData.get("serverport");
if (portRaw && portRaw.toString().trim() !== "") {
  serverip = `${serverip}:${portRaw.toString().trim()}`;
}

const educ: "bedrock" | "java" =
  formData.get("bedrock") === "on" ? "bedrock" : "java";

  const bedrock = formData.has("bedrock");


const params = new URLSearchParams({
  host: serverip,
  type: educ,
});



const res = await fetch(
  `http://localhost:3000/api/serverping?${params.toString()}`
);


if (!res.ok) {
  console.error("Ping failed:", res.status);
  //hier fehlerseite hinzufügen!
  return Response.json({error: "fehler"});
}

const dataping = await res.json();
const data: any = {};

    data.servername =  formData.get("servername")?.toString()!
    data.ip =         serverip
    data.icon =        dataping.data.favicon
    data.bedrock =     bedrock
    data.servercountry =  formData.get("servercountry")?.toString()!
    data.description =    formData.get("serverdescription")?.toString()!
   let version = (formData.get("serverversion") as string);
   data.versionMajor = Number(version.split(".")[0])
      data.versionMinor = Number(version.split(".")[1])
    data.config =    formData.get("config")?.toString()!
    const website = formData.get("website")?.toString();
    if (website) data.website = website;

    const discord = formData.get("discord")?.toString();
    if (discord) data.discord = discord;
    const instagram = formData.get("instagram")?.toString();
    if (instagram) data.instagram = instagram;
    const ticktock = formData.get("ticktock")?.toString();
    if (ticktock) data.ticktock = ticktock;
    const youtube = formData.get("youtube")?.toString();
    if (youtube) data.ticktock = youtube;
    data.user = {
      connect: { id: session?.user?.id}
    }

  try {
  // 1. Create the server
  // We don't use .catch() here because the outer try/catch handles it
  const server = await prisma.mcServer.create({
    data:{
      ...data,
      history: {
        create: {
          online: true
        }
      }
    }
  });

  // 2. Create the history using the ID from the server we just made
  // Return success or redirect
  return Response.redirect("/")

} catch (error) {
  console.error("Database Error:", error);
  // If either the server OR the history fails, it ends up here
  return Response.redirect(process.env.NEXTAUTH_URL!);
}




return Response.redirect(process.env.NEXTAUTH_URL!)
}


