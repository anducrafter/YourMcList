import { pingServer } from '@/app/compoments/pingServer';
import { prisma } from '@/lib/actions/prisma';
import { McServer } from '@/lib/generated/prisma/client';

// Define the shape of your ping response
interface PingResponse {
  players: number;
  motd: {
    clean: string;
    raw: string;
  };
}

export async function GET() {
  const servers: McServer[] = await prisma.mcServer.findMany();

  const batchSize = 20;

  for (let i = 0; i < servers.length; i += batchSize) {
    const batch = servers.slice(i, i + batchSize);

    await Promise.all(
      batch.map(async (server) => {
        try {
          // 1. Determine Type and Port
          let port: number = server.bedrock ? 19132 : 25565;
          const type: "bedrock" | "Java" = server.bedrock ? "bedrock" : "Java";

          // Handle custom ports in the IP string (e.g., "127.0.0.1:25566")
          if (server.ip.includes(":")) {
            const parts = server.ip.split(":");
            port = parseInt(parts[1], 10);
          }

          // 2. Ping with a try-catch to handle network failures
          // Explicitly cast or handle the return type of pingServer
          const res = await pingServer(server.ip, port, type) as PingResponse | null;

          // 3. Construct the history object
          // We use the 'server' object from findMany to get the ID safely
          await prisma.mcServerHistory.create({
            data: {
              playersOnline: res?.players.online ?? 0,
              versionText: res?.motd?.clean ?? "Offline",
              online: !!res,
              serverid: server.serverid, // Assumes this field exists in your schema
            },
          });

        } catch (error) {
          // This block catches DNS errors, timeouts, or coding bugs
          console.error(`[Ping Error] ${server.ip}:`, error instanceof Error ? error.message : error);

          // Optional: Record a failure entry so your graphs show the downtime
          await prisma.mcServerHistory.create({
            data: {
              playersOnline: 0,
              versionText: "Connection Failed",
              online: false,
              serverid: server.serverid,
            },
          }).catch(() => { /* Ignore DB write errors here to prevent total crash */ });
        }
      })
    );
  }

  return Response.json({ ok: true });
}