import { auth } from "@/auth";
import { prisma } from "@/lib/actions/prisma";

export default async function Page() {
  const session = await auth();

  // 1. Safety check
  if (!session?.user?.id) {
    return <div>Not authenticated or ID missing</div>;
  }

  // 2. Fetch servers where userId matches session ID
  const servers = await prisma.mcServer.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      _count: {
        select: { history: true } // Just an example: counts total history logs
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div>
      {servers.map((server) => (
        <div key={server.serverid}>
          <h2>{server.servername}</h2>
          <p>IP: {server.ip}</p>
        </div>
      ))}
    </div>
  );
}