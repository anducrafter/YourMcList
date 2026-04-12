import { SearchFrom } from '@/app/compoments/dynamic/SearchFrom'
import SearchList from '@/app/compoments/dynamic/SearchList';
import React from 'react'
type HomeProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined}>;
    
   
}
async function page({searchParams}: HomeProps)  {
     
     const search = (await searchParams).search as string;
     const tags = (await searchParams).tags as string;
    const servercountry = (await searchParams).country as string;
    const version = (await searchParams).versions as string;
  return (
    <div>
<div className="mt-5 flex justify-center px-4">
  <div className="w-full max-w-5xl">
  
  <SearchFrom></SearchFrom>
 </div>
      </div>
       

       <SearchList query={search} tags={tags} servercountry={servercountry}  version={version}></SearchList>
    </div>
  )
}

export default page