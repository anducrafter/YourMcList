import { prisma } from '@/lib/actions/prisma';
import Image from 'next/image';
import Link from 'next/link';


export const metadata = {
  title: 'Best Minecraft Servers 2026 | Top List & Rankings | YourMCList',
  description: 'Find and vote for the best Minecraft servers in 2026. Explore our updated list of top-ranked servers for Skyblock, Survival, Bedwars and more!',
  keywords: ['best minecraft servers 2026', 'minecraft server liste', 'mc servers', 'minecraft rangliste'],
};

// Hilfsfunktion für SEO-freundliche URLs (Slugs)
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Leerzeichen durch Bindestriche ersetzen
    .replace(/[^\w-]+/g, '')   // Sonderzeichen entfernen
    .replace(/--+/g, '-');    // Mehrfache Bindestriche durch einen ersetzen
}
let orderBy: any = { votes: { _count: 'desc' } }
export default async function StartPage() {
  const [newestServers, topServers] = await Promise.all([
    prisma.mcServer.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      include: {
        history: {
          orderBy: { checkedAt: 'desc' },
          take: 1,
        },
      },
    }),
      
    prisma.mcServer.findMany({
      take: 10,
      orderBy, // Tipp: Später vielleicht nach "votes" sortieren?
      include: {
        history: {
          orderBy: { checkedAt: 'desc' },
          take: 1,
        },
      },
    }),
  ]);

  // 2. JSON-LD für Google (Damit Google deine Liste als "Rich Result" versteht)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Best Minecraft Servers 2026",
    "itemListElement": topServers.map((server, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://yourmclist.com/serverliste/server/${server.serverid}-${slugify(server.servername)}`,
      "name": server.servername
    }))
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 space-y-20">
      {/* Script für strukturierte Daten in den Head injizieren */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 3. HERO SEKTION MIT H1 (Extrem wichtig für SEO) */}
      <section className="text-center md:text-left mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-black mb-4 tracking-tighter">
          BEST MINECRAFT SERVERS 2026
        </h1>
        <p className="text-neutral-500 max-w-2xl text-lg">
          Discover the ultimate collection of top-rated Minecraft servers. 
          Vote for your favorites and join active communities today.
        </p>
      </section>

      {/* NEWEST ARRIVALS */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Fresh Entries</h2>
            <p className="text-xl font-black text-black">Newest Arrivals</p>
          </div>
          <Link href="/serverliste/search" className="text-xs font-bold border-b-2 border-black pb-1">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newestServers.map((server) => {
            const status = server.history?.[0];
            const isOnline = status?.online ?? false;
            const serverSlug = `${server.serverid}-${slugify(server.servername)}`;

            return (
              <Link href={`/serverliste/server/${serverSlug}`} key={server.serverid}>
                <div className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Image 
                        src={server.icon || '/placeholder.png'} 
                        alt={`${server.servername} Minecraft Server`} 
                        width={52} height={52} 
                        className="rounded-xl bg-neutral-100"
                      />
                      <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-neutral-300'}`} />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-black truncate">{server.servername}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase ${isOnline ? 'text-green-600' : 'text-neutral-400'}`}>
                          {isOnline ? `${status?.playersOnline || 0} Players` : 'Offline'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* TOP 10 LEADERBOARD */}
      <section>
        <div className="mb-10">
          <h2 className="text-3xl font-black tracking-tighter text-black uppercase">Top 10 Rankings</h2>
          <div className="h-1.5 w-12 bg-black mt-2"></div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {topServers.map((server, index) => {
            const status = server.history?.[0];
            const isOnline = status?.online ?? false;
            const serverSlug = `${server.serverid}-${slugify(server.servername)}`;

            return (
              <Link href={`/serverliste/server/${serverSlug}`} key={server.serverid}>
                <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-4 hover:border-black transition-all group">
                  
                  {/* Left Side: Rank, Icon, and Name */}
                  <div className="flex items-center gap-4 md:gap-8">
                    <span className="text-xl font-black text-neutral-200 w-6 group-hover:text-black transition-colors">
                      {index + 1}
                    </span>
                    
                    <div className="relative hidden sm:block">
                      <Image 
                        src={server.icon || '/placeholder.png'} 
                        alt={`${server.servername} Icon`} 
                        width={48} height={48} 
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-black group-hover:underline decoration-2">{server.servername}</h3>
                      <div className="flex items-center gap-3 mt-0.5">
                         <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                           {server.versionMajor}.{server.versionMinor}
                         </span>
                         <span className="text-neutral-200 text-xs">/</span>
                         <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                           {server.servercountry}
                         </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: IP address with LIVE Label */}
                  <div className="text-right flex items-center gap-6">
                    <div className="hidden md:block">
                      <div className="flex items-center justify-end gap-1.5 mb-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-neutral-300'}`} />
                        <p className={`text-[9px] font-black uppercase tracking-widest ${isOnline ? 'text-green-600' : 'text-neutral-400'}`}>
                          {isOnline ? `${status?.playersOnline || 0} Players Online` : 'Offline'}
                        </p>
                      </div>
                      
                      <p className="font-mono text-xs bg-neutral-50 px-2 py-1 rounded border border-neutral-100 text-neutral-600">
                        {server.ip}
                      </p>
                    </div>
                    
                    <span className="text-neutral-300 group-hover:text-black transition-colors" aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}