import { auth } from "@/auth";
import { prisma } from "@/lib/actions/prisma";
import Image from 'next/image';
import Link from 'next/link';

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div className="p-20 text-center">
        <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">Access Denied</p>
        <h1 className="text-2xl font-black mt-2">Please log in to manage servers</h1>
      </div>
    );
  }

  const servers = await prisma.mcServer.findMany({
    where: { userId: session.user.id },
    include: {
      history: {
        orderBy: { checkedAt: 'desc' },
        take: 1,
      }
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tighter uppercase">My Servers</h1>
        <p className="text-neutral-500 text-sm">Manage your listings and view performance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {servers.map((server) => {
          const status = server.history?.[0];
          const isOnline = status?.online ?? false;

          return (
            <div key={server.serverid} className="flex items-center justify-between p-5 border border-neutral-200 rounded-2xl bg-white hover:border-black transition-all">
              <div className="flex items-center gap-5">
                <Image src={server.icon || '/placeholder.png'} alt="icon" width={48} height={48} className="rounded-lg" />
                <div>
                  <h2 className="font-bold text-lg">{server.servername}</h2>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-black uppercase ${isOnline ? 'text-green-600' : 'text-neutral-400'}`}>
                      {isOnline ? `● ${status?.playersOnline} Online` : 'Offline'}
                    </span>
                    <span className="text-neutral-200 text-xs">/</span>
                    <span className="text-[10px] font-mono text-neutral-400">{server.ip}</span>
                  </div>
                </div>
              </div>
              
              <Link 
                href={`/serverliste/edit/${server.serverid}`}
                className="px-5 py-2 bg-neutral-100 text-xs font-bold rounded-lg hover:bg-black hover:text-white transition-all"
              >
                Edit Settings
              </Link>
            </div>
          );
        })}

        {servers.length === 0 && (
          <div className="p-20 border-2 border-dashed border-neutral-100 rounded-3xl text-center">
             <p className="text-neutral-400">You haven't added any servers yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}