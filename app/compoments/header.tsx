import { auth } from '@/auth'
import Link from 'next/link'
import { ButtonSign } from './dynamic/ButtonSign'
import Image from "next/image";
import { ButtonSignOut } from './dynamic/ButtonSignOut';

const Header = async () => {
  const session = await auth();
  const iconPath = "/icon.png";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden rounded-xl shadow-md group-hover:shadow-lg transition-all">
              <Image
                src={iconPath}
                alt="Logo"
                width={48}
                height={48}
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="font-black text-xl tracking-tight hidden sm:block">
              YOUR<span className="text-gray-500">MCLIST</span>
            </span>
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Main Links */}
              <div className="flex items-center gap-2 border-r border-gray-200 pr-4 sm:pr-6">
                <Link
                  href="/serverliste/search"
                  className="text-sm font-semibold text-gray-600 hover:text-black transition-colors px-3 py-2"
                >
                  Browse
                </Link>
                <Link
                  href="/serverliste/addserver"
                  className="hidden md:block px-4 py-2 rounded-lg bg-black text-white text-sm font-bold hover:bg-zinc-800 transition-all shadow-sm active:scale-95"
                >
                  + Add Server
                </Link>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end hidden lg:flex">
                  <p className="text-xs font-bold leading-none">{session.user?.name}</p>
                  <p className="text-[10px] text-gray-500">Member</p>
                </div>
                <Link href="/profile" className="relative group">
                  <Image
                    src={session.user?.image || '/placeholder-user.png'}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white shadow-sm group-hover:ring-2 group-hover:ring-black transition-all"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </Link>
              </div>
                <ButtonSignOut></ButtonSignOut>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/serverliste/search"
                className="text-sm font-semibold text-gray-600 hover:text-black px-3"
              >
                Browse
              </Link>
              <ButtonSign />
            
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;