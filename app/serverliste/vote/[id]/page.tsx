import { Metadata } from 'next';
import Image from 'next/image';
import { cache } from 'react';
import { prisma } from '@/lib/actions/prisma';
import SubmitMcName from '@/app/compoments/dynamic/SubmitMcName';

// 1. DATA FETCHING (Deduplicated with cache)
const getServerData = cache(async (id: string) => {
  const ids = id.split("-")[0];
  return await prisma.mcServer.findUnique({
    where: { serverid: ids },
  });
});

// 2. DYNAMIC METADATA (SEO & AI Optimization)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const api = await getServerData(id);

  if (!api) return { title: 'Server Not Found' };

  const title = `Vote for ${api.servername} | ${api.ip}`;
  const description = `Play on ${api.servername} (${api.bedrock ? 'Bedrock' : 'Java'}). IP: ${api.ip}. ${api.description?.substring(0, 150)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [api.icon || '/placeholder-server.png'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [api.icon || '/placeholder-server.png'],
    },
  };
}

// 3. PAGE COMPONENT
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const api = await getServerData(id);

  if (!api) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-20 text-center font-medium">
        <div className="rounded-3xl border border-neutral-200 bg-white p-12 shadow-sm">
          <h2 className="text-2xl font-bold text-black">Server not found</h2>
          <p className="mt-2 text-neutral-500">The server you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  // JSON-LD Structured Data for AI Agents (ChatGPT/Perplexity/Google)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GameServer",
    "name": api.servername,
    "identifier": api.ip,
    "description": api.description,
    "image": api.icon,
    "game": "Minecraft",
    "playMode": api.bedrock ? "Bedrock Edition" : "Java Edition",
    "serverStatus": "https://schema.org/OnlineServer",
  };

  return (
    <div className='bg-neutral-50 py-12 px-4 min-h-screen font-sans'>
      {/* Structured Data Insertion */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto">
        {/* HEADER SECTION */}
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Server Image/Icon */}
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50 shadow-inner">
              <Image
                src={api.icon || '/placeholder-server.png'}
                alt={`${api.servername} icon`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Main Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
                <h1 className="text-4xl font-black tracking-tight text-black">
                  {api.servername}
                </h1>
                <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  api.approved ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {api.approved ? 'Verified' : 'Pending'}
                </span>
              </div>
              
              <p className="text-xl font-mono text-neutral-400 mb-6 selection:bg-black selection:text-white">
                {api.ip}
              </p>

              {/* Client Component: SubmitMcName */}
              <div className="max-w-md mx-auto md:mx-0">
                <SubmitMcName api={api} />
              </div>

              {/* Badges / Edition Tags */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="px-4 py-2 bg-neutral-100 rounded-lg text-xs font-bold border border-neutral-200 uppercase tracking-wide text-neutral-700">
                  {api.bedrock ? 'Bedrock Edition' : 'Java Edition'}
                </div>
                {api.servercountry && (
                   <div className="px-4 py-2 bg-neutral-100 rounded-lg text-xs font-bold border border-neutral-200 uppercase tracking-wide text-neutral-700">
                   Region: {api.servercountry}
                 </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION SECTION (Optional but good for SEO) */}
        {api.description && (
          <div className="mt-8 p-8 rounded-3xl border border-neutral-200 bg-white shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">About the Server</h3>
            <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
              {api.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;