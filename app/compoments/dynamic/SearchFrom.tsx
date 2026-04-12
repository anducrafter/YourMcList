"use client"
import { usePathname, useRouter } from 'next/navigation';
import MultiColumnDropdown from '@/app/compoments/dynamic/inputtags'
import React, { useState } from 'react'
import * as Slider from "@radix-ui/react-slider";
import Dropdown from './Inputcountrys';

// alle Full Releases
const versions: string[] = [
  "1.0","1.1","1.2","1.3","1.4","1.5","1.6","1.7","1.8","1.9",
  "1.10","1.11","1.12","1.13","1.14","1.15","1.16","1.17",
  "1.18","1.19","1.20","1.21"
];

export default function RangeSliderMinecraft() {
  const [range, setRange] = useState<[number, number]>([0, 21]); 
  // default: 1.8 to 1.21

  const handleChange = (values: number[]): void => {
    setRange([values[0], values[1]]);
  };


  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-3 text-xl font-medium">
        Version: {versions[range[0]]} – {versions[range[1]]}
        
      </div>

      <Slider.Root
        min={0}
        max={versions.length - 1}
        step={1}
        value={range}
        onValueChange={handleChange}
        name='range'
        className="relative flex items-center w-full h-6"
      >
        <Slider.Track className="bg-neutral-200 relative grow rounded-full h-2">
          <Slider.Range className="absolute bg-black rounded-full h-full" />
        </Slider.Track>

        <Slider.Thumb className="block w-5 h-5 bg-gray-50 border border-gray-800 rounded-full shadow cursor-pointer" />
        <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-800 rounded-full shadow cursor-pointer" />
      </Slider.Root>
      <input type="hidden" name='range' value={[range[0].toString(), range[1].toString()]} />
      <div className="flex justify-between text-sm mt-2">
        <span>{versions[0]}</span>
        <span>{versions[versions.length - 1]}</span>
      </div>
    </div>
  );
}

export const SearchFrom = () => {
const router = useRouter()
const pathname = usePathname();
        const handleSearch = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const formdata = new FormData(event.currentTarget);
        const inputSearchValue = formdata.get("servername") as string;
        const tagsSearchValue = formdata.get("config") as string;
        const countrySerachValue = formdata.get("servercountry") as string;
         const versionSerachValue = formdata.get("range") as string;
        const params = new URLSearchParams();
        if (inputSearchValue){
            params.set("search",inputSearchValue);
           
        }else {
          params.delete("search");
        }

        if(tagsSearchValue){
          params.set("tags",tagsSearchValue)

        }else{
          params.delete("tags")
        }

        if(countrySerachValue){
          params.set("country",countrySerachValue)
        }else{
          params.delete("country");
        }

        if(versionSerachValue){
          params.set("versions",versionSerachValue)
        }else{
          params.delete("versions");
        }
        router.replace(`${pathname}?${params.toString()}`);
      }


  return (
  <>
  <form onSubmit={handleSearch}>
  <input className='mt-2 w-full rounded-lg border border-neutral-300 p-2 text-sm shadow-sm focus:border-black focus:outline-none' placeholder='Search' name='servername' />
  <MultiColumnDropdown></MultiColumnDropdown>
<Dropdown></Dropdown>
<div className='mt-5'>

</div>
{RangeSliderMinecraft()}
<div className='flex justify-center'>
<input className='text-center text-2xl p-10 bpx-4 py-2 my-5 rounded-xl bg-black text-white hover:bg-gray-900 transition shadow-sm' type="submit" value="search" placeholder='test' />
</div>



  </form>

  </>
  )
}
