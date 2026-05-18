import { ChartAreaInteractive } from '@/app/compoments/dynamic/chartonlineinteractiv';
import CopyIpButton from '@/app/compoments/dynamic/copyInButton';
import { prisma } from '@/lib/actions/prisma';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ids = id.split("-")[0]; // same logic as in your ServerPage

  const server = await prisma.mcServer.findUnique({ where: { serverid: ids } });
  if (!server) return { title: "Server not found" };

  return {
    title: `${server.servername} | Minecraft Server | YourMCList`,
    description: `Join ${server.servername} — a Minecraft ${server.bedrock ? "Bedrock" : "Java"} server from ${server.servercountry}. IP: ${server.ip}`,
  };
}

const ServerPage = async ({ params }: { params: Promise<{ id: string }>; }) => {
  const { id } = await params;
  let ids = id.split("-")[0]


  const api = await prisma.mcServer.findUnique({
    where: { serverid: ids },
  });

  const history = await prisma.mcServerHistory.findMany({
    where: { serverid: ids },
  });
  console.log(history)
  const votes = await prisma.vote.count({
    where: {serverId: ids}
  })

  if (!api) return <div className="p-20 text-center font-medium">Server not found</div>;

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* HEADER SECTION */}
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Server Image */}
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-100">
              <Image
                src={api.icon || '/placeholder-server.png'}
                alt={api.servername}
                fill
                className="object-cover"
              />
            </div>

            {/* Main Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
                <h1 className="text-4xl font-black tracking-tight text-black">
                  {api.servername}
                </h1>
                <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${api.approved ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-600'}`}>
                  {api.approved ? 'Verified' : 'Pending'}
                </span>
              </div>
              <p className="text-xl font-mono text-neutral-400 mb-6">{api.ip}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <CopyIpButton ip={api.ip} />
                <div className="px-4 py-2 bg-neutral-100 rounded-lg text-xs font-bold border border-neutral-200 uppercase tracking-wide">
                  {api.bedrock ? 'Bedrock Edition' : 'Java Edition'}
                </div>

                <Link 
  href={`/serverliste/vote/${api.serverid}`}
  className="inline-flex items-center justify-center px-4 py-2 bg-black text-white border border-neutral-200 rounded-2xl text-sm font-bold uppercase tracking-widest  hover:bg-neutral-900 transition-all shadow-sm"
>
  <span className="mr-2"></span>
  Go to Vote Page
</Link>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Technical Stats Bar */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-neutral-200 rounded-xl p-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Version</p>
                <p className="font-bold text-sm">{api.versionMajor}.{api.versionMinor}</p>
              </div>
              <div className="bg-white border border-neutral-200 rounded-xl p-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Location</p>
                <p className="font-bold text-sm">{api.servercountry}</p>
              </div>
              <div className="bg-white border border-neutral-200 rounded-xl p-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Date Joined</p>
                <p className="font-bold text-sm">{new Date(api.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6 border-b border-neutral-100 pb-2">
                Server Description
              </h3>
              <div className="text-sm text-neutral-600 leading-relaxed whitespace-pre-wrap">
                {api.description}
              </div>
            </div>

            {/* Activity Chart */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8 border-b border-neutral-100 pb-2">
                Player Statistics
              </h3>
              <ChartAreaInteractive chartData={history} />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-neutral-200 rounded-xl p-5">
               <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-neutral-400 ">Votes</span>
                  <span className="text-neutral-900 text-lg">{votes}</span>
               </div>
            </div>
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">External Links</h3>
              <div className="space-y-2">
                {api.website && <SocialLink href={api.website} label="Website" />}
                {api.discord && <SocialLink href={api.discord} label="Discord" />}
                {api.instagram && <SocialLink href={api.instagram} label="Instagram" />}
                {api.youtube && <SocialLink href={api.youtube} label="YouTube" />}
                {api.ticktock && <SocialLink href={api.ticktock} label="TikTok" />}
                {!api.website && !api.discord && !api.instagram && (
                    <p className="text-neutral-400 text-xs italic py-2">No links available</p>
                )}
              </div>
            </div>

            {/* Small Metadata Card */}
            <div className="bg-white border border-neutral-200 rounded-xl p-5">
               <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-neutral-400">Status Check</span>
                  <span className="text-neutral-900">{api.cheked || 'Active'}</span>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

// Simplified Social Link (No Icons)
const SocialLink = ({ href, label }: { href: string; label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center justify-between w-full p-3 rounded-lg border border-neutral-100 bg-neutral-50 hover:bg-black hover:text-white transition-all text-sm font-bold group"
  >
    <span>{label}</span>
    <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Visit Site</span>
  </a>
);

export default ServerPage;