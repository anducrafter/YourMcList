import { prisma } from '@/lib/actions/prisma';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  // These now match the URLSearchParams set in your SearchForm
  query?: string;
  tags?: string;
  servercountry?: string; 
  version?: string; 
  page?: string;
  sort?: string; // Accept the sort parameter
};

const SearchList = async ({ query, tags, servercountry, version, page, sort }: Props) => {
  const currentPage = Number(page) || 1;
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;

  const where: any = {};

  // Match the keys exactly to what SearchForm.tsx sends
  if (query?.trim()) {
    where.servername = { contains: query.trim(), mode: "insensitive" };
  }

  if (servercountry?.trim()) {
    where.servercountry = { contains: servercountry.trim(), mode: "insensitive" };
  }

  if (tags?.trim()) {
    where.config = { contains: tags.trim() };
  }

  if (version) {
    const [major, minor] = version.split(",").map(Number);
    where.versionMinor = { gte: major, lte: minor };
  }

  // --- FIX: Dynamic Sorting ---
  let orderBy: any = { votes: { _count: 'desc' } }; // Default sort

  if (sort === 'players') {
   
    // Note: This requires the 'playersOnline' column in your McServer schema
    orderBy = { playersOnline: 'desc' };
  } else if (sort === 'newest') {
    orderBy = { createdAt: 'desc' };
  }

  const [prismaresult, totalCount] = await Promise.all([
    prisma.mcServer.findMany({
      where,
      skip,
      take: pageSize,
      orderBy,
      include: {
        history: {
          orderBy: { checkedAt: 'desc' },
          take: 1,
        },
        _count: {
          select: { votes: true }
        }
      },
    }),
    prisma.mcServer.count({ where })
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (tags) params.set('tags', tags);
    if (servercountry) params.set('servercountry', servercountry);
    if (version) params.set('version', version);
    if (sort) params.set('sort', sort); // Keep sort state during pagination
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className="space-y-4">
        {prismaresult.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed">
            <p className="text-gray-400 font-bold">No servers found matching those filters.</p>
          </div>
        ) : (
          prismaresult.map((result) => {
            const status = result.history?.[0];
            const isOnline = status?.online ?? false;
            const voteCount = result._count?.votes || 0;

            return (
              <Link href={"/serverliste/server/" + result.serverid + "-" + result.servername} key={result.serverid} className="block">
                <div className='border shadow-sm hover:shadow-md transition-all border-gray-200 rounded-xl p-5 flex justify-between items-center bg-white group hover:border-black'>
                  <div className='flex items-center'>
                    <div className="relative">
                      <Image 
                        src={result.icon || '/placeholder.png'} 
                        className="rounded-lg border border-gray-100"
                        alt={result.servername + ' icon'} 
                        width={64} 
                        height={64} 
                      />
                      <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                    </div>
                    
                    <div className='ml-5'>
                      <div className="flex items-center gap-2">
                        <p className='font-bold text-gray-900 text-lg group-hover:underline'>{result.servername}</p>
                        <span className="text-[10px] font-black px-2 py-0.5 bg-gray-100 rounded text-gray-500 uppercase">{voteCount} Votes</span>
                      </div>
                      <p className='text-sm text-gray-500 line-clamp-1 max-w-md'> 
                        {result.description}
                      </p>
                    </div>
                  </div>

                  <div className='text-right hidden sm:block'>
                    <div className="flex items-center justify-end gap-1.5 mb-1">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                        {isOnline ? `${status?.playersOnline || 0} Players Online` : 'Offline'}
                      </p>
                    </div>
                    
                    <p className='text-sm font-mono bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 group-hover:bg-white transition-colors'>
                      {result.ip}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Pagination (Your existing logic) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-10 mb-10">
          <Link
            href={createPageURL(currentPage - 1)}
            className={`px-4 py-2 rounded-lg border ${currentPage <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'}`}
          >
            Previous
          </Link>
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                return (
                  <Link
                    key={pageNum}
                    href={createPageURL(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg border font-bold ${
                      currentPage === pageNum ? 'bg-black text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              }
              return null;
            })}
          </div>
          <Link
            href={createPageURL(currentPage + 1)}
            className={`px-4 py-2 rounded-lg border ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'}`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}

export default SearchList;