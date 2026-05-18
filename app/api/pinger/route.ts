import { pingServer } from '@/app/compoments/pingServer';
import { prisma } from '@/lib/actions/prisma';

// Define the shape of your ping response
interface PingResponse {
  players: {
    online: number;
  };
  motd: {
    clean: string;
  };
}

export async function GET() {
  // 1. Fetch all servers (only the fields we need to save memory)
  const servers = await prisma.mcServer.findMany({
    select: {
      serverid: true,
      ip: true,
      bedrock: true,
    }
  });

  const batchSize = 40; // Increased batch size for faster processing
  const historyData = []; // Array to collect results for bulk insert

  for (let i = 0; i < servers.length; i += batchSize) {
    const batch = servers.slice(i, i + batchSize);

    // Ping the current batch in parallel
    const batchResults = await Promise.all(
      batch.map(async (server) => {
        try {
          let port: number = server.bedrock ? 19132 : 25565;
          const type: "bedrock" | "Java" = server.bedrock ? "bedrock" : "Java";

          if (server.ip.includes(":")) {
            const parts = server.ip.split(":");
            port = parseInt(parts[1], 10);
          }

          // We wait for the ping, but if it hangs, the try/catch handles it
          const res = await pingServer(server.ip, port, type) as PingResponse | null;

          const playerCount = res?.players?.online ?? 0;
          const isOnline = !!res;
          await prisma.mcServer.update({
            where: { serverid: server.serverid },
            data: { playersOnline: playerCount }
          });
          return {
            serverid: server.serverid,
            playersOnline: res?.players?.online ?? 0,
            online: !!res,
            versionText: res?.motd?.clean?.slice(0, 100) ?? "Offline",
          };

        } catch (error) {
          console.error(`[Ping Failed] ${server.ip}`);
          await prisma.mcServer.update({
            where: { serverid: server.serverid },
            data: { playersOnline: 0 }
          });
          return {
            serverid: server.serverid,
            playersOnline: 0,
            online: false,
            versionText: "Connection Failed",
          };
        }
      })
    );

    // Add this batch's results to our main collection
    historyData.push(...batchResults);
  }

  // 2. BULK INSERT: This is the most important part for performance
  try {
    if (historyData.length > 0) {
      await prisma.mcServerHistory.createMany({
        data: historyData,
        skipDuplicates: true,
      });
    }
  } catch (dbError) {
    console.error("Bulk Insert Error:", dbError);
    return Response.json({ error: "Failed to save history" }, { status: 500 });
  }

  return Response.json({ 
    success: true, 
    serversProcessed: historyData.length 
  });
}