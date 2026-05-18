"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MultiColumnDropdown from '@/app/compoments/dynamic/inputtags'
import React, { useState } from 'react'
import * as Slider from "@radix-ui/react-slider";
import Dropdown from './Inputcountrys';

const versions: string[] = [
  "1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9",
  "1.10", "1.11", "1.12", "1.13", "1.14", "1.15", "1.16", "1.17",
  "1.18", "1.19", "1.20", "1.21", "26.0"
];

const RangeSliderMinecraft = ({ range, setRange }: { range: [number, number], setRange: (v: [number, number]) => void }) => {
  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-end mb-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Version Range</label>
        <span className="text-sm font-mono font-bold bg-black text-white px-2 py-0.5 rounded">
          {versions[range[0]]} – {versions[range[1]]}
        </span>
      </div>

      <Slider.Root
        min={0}
        max={versions.length - 1}
        step={1}
        value={range}
        onValueChange={(v) => setRange([v[0], v[1]])}
        className="relative flex items-center w-full h-6 touch-none select-none"
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-1.5">
          <Slider.Range className="absolute bg-black rounded-full h-full" />
        </Slider.Track>

        <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-black rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-black transition-transform active:scale-95 cursor-grab" />
        <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-black rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-black transition-transform active:scale-95 cursor-grab" />
      </Slider.Root>
      
      <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-1">
        <span>{versions[0]}</span>
        <span>{versions[versions.length - 1]}</span>
      </div>
    </div>
  );
}

export const SearchFrom = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL or defaults
  const [range, setRange] = useState<[number, number]>([0, 26]);
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'votes');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    
    const params = new URLSearchParams();
    const search = formdata.get("servername") as string;
    const tags = formdata.get("config") as string;
    const country = formdata.get("servercountry") as string;

    if (search) params.set("query", search); // Changed to 'query' to match your SearchList
    if (tags) params.set("tags", tags);
    if (country) params.set("servercountry", country); // Match SearchList prop
    
    params.set("version", `${range[0]},${range[1]}`); // Match SearchList prop
    params.set("sort", sortBy);

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm max-w-4xl mx-auto my-8">
      <form onSubmit={handleSearch} className="space-y-6">
        
        {/* Top Row: Search & Sort */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">Server Name</label>
            <input 
              className='w-full rounded-xl border border-gray-200 p-3 text-sm transition-all focus:border-black focus:ring-1 focus:ring-black focus:outline-none bg-gray-50 hover:bg-white' 
              placeholder='Search for server name...' 
              name='servername' 
              defaultValue={searchParams.get('query') || ''}
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block">Sort By</label>
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200 h-[46px]">
              <button
                type="button"
                onClick={() => setSortBy('votes')}
                className={`flex-1 text-[10px] font-black uppercase rounded-lg transition-all ${sortBy === 'votes' ? 'bg-black text-white shadow-sm' : 'text-gray-400 hover:text-black'}`}
              >
                Votes
              </button>
              <button
                type="button"
                onClick={() => setSortBy('players')}
                className={`flex-1 text-[10px] font-black uppercase rounded-lg transition-all ${sortBy === 'players' ? 'bg-black text-white shadow-sm' : 'text-gray-400 hover:text-black'}`}
              >
                Players
              </button>
            </div>
          </div>
        </div>

        {/* Dropdowns Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Filter by Tags</label>
            <MultiColumnDropdown />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Location</label>
            <Dropdown />
          </div>
        </div>

        {/* Slider Section */}
        <RangeSliderMinecraft range={range} setRange={setRange} />

        {/* Action Button */}
        <div className='flex justify-center pt-4'>
          <button 
            type="submit" 
            className='w-full md:w-auto px-12 py-3 rounded-xl bg-black text-white font-bold hover:bg-zinc-800 transition-all transform hover:-translate-y-0.5 shadow-lg active:scale-95'
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  )
}