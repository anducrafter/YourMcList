import React from 'react'
import COUNTRIES from '@/app/compoments/countrys'
import Dropdown from '@/app/compoments/dynamic/Inputcountrys'
import MultiColumnDropdown from '@/app/compoments/dynamic/inputtags'
import {handleSubmit, ErrorBox} from '@/app/compoments/dynamic/handleSubmit'
import InputVersoin from '@/app/compoments/dynamic/inputversion'
const addServer = () => {

  
  return (

    <>


<div className=' m-10 '>
  <form action="/api/addserver" method='POST'>
<div className=' grid grid-cols-12 gap-8 min-h-svh rounded-xl border bg-white p-10 shadow-sm border-neutral-200 '>



   <div className='col-span-12 lg:col-span-6 space-y-6 '>


    <div className='text-center'>
      <h2 className='text-4xl font-semibold text-black'>
        Server Information
        </h2>
    </div>

    <div> 
      <h3 className='font-medium text-black'>Server name</h3>
      <p className='text-sm text-neutral-500'>Add the name of your server, max  60 characters</p>
      <input name='servername' required type="text" placeholder='My Minecraft Server' maxLength={60} className='mt-2 w-full rounded-lg border border-neutral-300 p-2 text-sm shadow-sm focus:border-black focus:outline-none' />
      
    </div>

          <div>
            <h3 className="font-medium text-black">Edition</h3>
            <label className="mt-2 flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                className="h-4 w-4 accent-black"
                name='bedrock'
                              />
              This is a Bedrock server
            </label>
          </div>
          
    <div className='flex gap-4'> 
      <div className='flex-1'>
       <h3 className="font-medium text-black">Server IP</h3>
      <p className='text-sm text-neutral-500'>your Ip address for your server</p>
      <input required  name='serverip' type="text" placeholder='server ip' className='mt-2 w-full rounded-lg border border-neutral-300 p-2 text-sm shadow-sm focus:border-black focus:outline-none' />
      </div>


            <div className="w-32">
              <h3 className="font-medium text-black">Port</h3>
              <p className="text-sm text-neutral-500">
                Optional
              </p>
              <input
                type="text"
                placeholder="25565"
                className="mt-2 w-full rounded-lg border border-neutral-300 p-2 text-sm shadow-sm focus:border-black focus:outline-none"
                name='serverport'
              />
            </div>
      
    </div>

      <div className='flex-1'>
       <h3 className="font-medium text-black">Server Version</h3>
      <p className='text-sm text-neutral-500'>The Version your Server is running</p>
     <InputVersoin></InputVersoin>
   
      </div>


        <div> 
      <h3 className='font-medium text-black'>Server Country</h3>
      <p className='text-sm text-neutral-500'>Add the country where your server comes from</p>
      
      <Dropdown></Dropdown>
    </div>

   
<div className="">
  <h3 className="font-medium text-black text-start">
    Server Description
  </h3>

  <p className="text-sm text-neutral-500">
    Add the description of your server
  </p>

  <textarea
    name="serverdescription"
    placeholder="Describe your server..."
    rows={12}
     required 
    maxLength={2000}
    className="mt-2 block w-full resize-none rounded-lg border border-neutral-300 p-2 text-sm shadow-sm focus:border-black focus:outline-none"
  />
</div>
        <div className='mb-20'> 
      <h3 className='font-medium text-black'>Server Tags</h3>
      <p className='text-sm text-neutral-500'>Add the Tags from your server</p>
      
      <MultiColumnDropdown></MultiColumnDropdown>
    </div>


    <div>
      <input type="submit" value="Submit" onClick={handleSubmit}   className=' bg-black text-white mt-2 block w-full resize-none rounded-lg border border-neutral-300 p-2 text-sm shadow-sm focus:border-black focus:outline-none'/>
   
    </div>


  </div>





    <div className='col-span-12 lg:col-span-6 rounded-lg  border-neutral-300   text-neutral-400  space-y-6'>
    <div className='text-center'>
      <h2 className='text-4xl font-semibold text-black'>
        Server Socials (optional)
        </h2>

    </div>
<div className='flex gap-4'>
    <div className='flex-1'> 
      <h3 className='font-medium text-black'>Website</h3>
      <p className='text-sm text-neutral-500'>Add the name of your server, max  60 characters</p>
      <input type="text" name='website' placeholder='My Minecraft Server' maxLength={60} className='text-black mt-2 block w-full resize-none rounded-lg border border-neutral-300 p-2 text-sm shadow-sm focus:border-black focus:outline-none' />
      
    </div>

     <div className='flex-1'> 
      <h3 className='font-medium text-black'>Discord</h3>
      <p className='text-sm text-neutral-500'>Add the discord of your server</p>
      <input type="text" name='discord' placeholder='My Discord' maxLength={60} className='text-black mt-2 w-full rounded-lg border border-neutral-300 p-2 text-sm shadow-sm focus:border-black focus:outline-none' />
    </div>

</div>

   <div className='flex gap-4'>
 <div className='flex-1'> 
      <h3 className='font-medium text-black'>Insagram</h3>
      <p className='text-sm text-neutral-500'>Add the website of your server</p>
      <input type="text" name='instagram' placeholder='My Website' maxLength={60} className='text-black mt-2 w-full rounded-lg border border-neutral-300 p-2 text-sm shadow-sm focus:border-black focus:outline-none' />
      
    </div>

     <div className='flex-1'> 
      <h3 className='font-medium text-black'>Ticktock</h3>
      <p className='text-sm text-neutral-500'>Add the discord of your server</p>
      <input type="text" name='ticktock' placeholder='My Discord' maxLength={60} className='text-black mt-2 w-full rounded-lg border border-neutral-300 p-2 text-sm shadow-sm focus:border-black focus:outline-none' />
    </div>

</div>
     <div className='flex-1'> 
      <h3 className='font-medium text-black'>YouTube</h3>
      <p className='text-sm text-neutral-500'>Add your advertisment YT Video</p>
      <input type="text" name='youtube' placeholder='My Discord' maxLength={60} className='text-black mt-2 w-full rounded-lg border border-neutral-300 p-2 text-sm shadow-sm focus:border-black focus:outline-none' />
    </div>

<div className='bg-neutral-50 border-neutral-200 p-4'>
  <h3 className='font-semibold text-black'>Server Socials only optional</h3>
      <p className='text-sm text-neutral-500'>  
         All the Server Social are only optional, they don't need to be in
         .</p>
</div>

  </div>

 
</div>

</form>
</div>
    </>
  )
}

export default addServer