
import { auth } from '@/auth'
import { login } from '@/lib/actions/auth'
import Link from 'next/link'
import { ButtonSignOut } from './dynamic/ButtonSignOut'
import { ButtonSign } from './dynamic/ButtonSign'
import Image from "next/image";
const   header = async () => {

  const session = await auth()
  const newLocal = "/icon.png"
  return (
   <>
 <div className="w-full  p-4 flex items-center justify-between shadow-lg">
  <div className="flex items-center gap-3">

        <Link href={"/"}>

            <img
      className="w-12 h-12 rounded-xl shadow"
      src={newLocal}
      alt="App Icon"
      loading='lazy'
    />
    </Link>

  

  </div>

  <nav className="flex items-center gap-3 text-lg">


{session ? (

  <div className='flex gap-3'>
      <Link
      href="/serverliste/search"
      className="px-4 py-2 rounded-xl  text-black  transition shadow-sm"
    >
      Search
    </Link>

    <Link href={"/"}>
    </Link>
<Image
  src={session.user?.image!}
  alt="User Image"
  width={48}
  height={48}
  loading='lazy'
  className='rounded-4xl'
/>

<div id='test'role="tooltip"   className='text-black absolute z-10 invisible inline-block w-80 text-sm text-body transition-opacity duration-300 bg-neutral-primary-soft border border-default rounded-base shadow-xs opacity-0"'>

</div>



    <Link
      href="/serverliste/addserver"
      className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-900 transition shadow-sm"
    >
      Add Server
    </Link>
  </div>
    
): (
<ButtonSign></ButtonSign>

)}


  </nav>
</div>
   </>
  )
}

export default header