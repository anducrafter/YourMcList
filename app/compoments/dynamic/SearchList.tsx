import { prisma } from '@/lib/actions/prisma';
import { autoJoin } from '@tiptap/pm/commands';
import { link } from 'fs';
import Image from 'next/image';
import Link from 'next/link';
import { version } from 'os';
import { versions } from 'process';
import { lazy } from 'react';


type Props = {
  query?: string;
  tags?: string;
  servercountry?: string;
  version?: string;
};


const SearchList = async ({ query, tags, servercountry, version }: Props) => {
  const where: any = {};

  if (query?.trim()) {
    where.servername = {
      contains: query.trim(),
      mode: "insensitive",
    };
  }

  if (servercountry?.trim()) {
   
    where.servercountry = {
      contains: servercountry.trim(),
      mode: "insensitive",
    };
  }

  if (tags?.trim()) {
    where.config = {
      contains: tags.trim(),
    };
  }

  if(version){
    const decoded = decodeURIComponent(version); // "0,14"

// split and convert to numbers

const [major, minor] = decoded.split(",").map(Number);
console.log(""+minor,major)
    where.versionMinor = {
      gte: major,
      lte: minor
    }
  }


  const prismaresult = await prisma.mcServer.findMany({
    where,
  });
   
  return (


    <div className='max-w-7xl mx-auto px-4'>{ prismaresult.map((result) =>(
    
   
    <Link
        href={"/serverliste/server/"+result.serverid} key={result.serverid}
      >
     
      
      <div className='border shadow-xl border-black rounded-lg p-5 m-2 flex justify-between text-lg'>
          <div className='flex '>
             <Image src={result.icon+""} loading='lazy' alt={result.servername+' icon'} width={64} height={64}></Image>
            <div className='ml-5'>
              <p className=''>{result.servername}</p>
              <p> {result.description.slice(0, 50)}</p>
            </div>


          </div>

          <div className='pr-4'>
            <p className='text-white text-center bg-black border rounded-lg  p-2'>serverip</p>
            <p className='text-xl'>{result.ip}</p>
          </div>
        </div>
        
         </Link>
       
      
    ))}</div>
  )
}

export default SearchList