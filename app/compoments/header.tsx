import { auth } from '@/auth'
import Link from 'next/link'
import Image from 'next/image'
import { ButtonSign } from './dynamic/ButtonSign'
import { ButtonSignOut } from './dynamic/ButtonSignOut'
import MobileMenu from "@/app/compoments/Mobilemenu";

const navLinks = [
  { href: '/serverliste/search', label: 'Browse' },
  { href: '/blog', label: 'Blog' },
  { href: '/forum', label: 'Forum' },
]

const linkClass =
    'text-sm font-semibold text-gray-600 hover:text-black transition-colors px-3 py-2 rounded-lg hover:bg-gray-100'

const mobileLinkClass =
    'block text-base font-semibold text-gray-700 hover:text-black hover:bg-gray-100 transition-colors px-3 py-3 rounded-lg'

const Header = async () => {
  const session = await auth()

  const avatar = (
      <div className="relative">
        <Image
            src={session?.user?.image || '/placeholder-user.png'}
            alt={session?.user?.name ?? 'User'}
            width={40}
            height={40}
            className="rounded-full border-2 border-white shadow-sm group-hover:ring-2 group-hover:ring-black transition-all"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      </div>
  )

  return (
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative overflow-hidden rounded-xl shadow-md group-hover:shadow-lg transition-all">
              <Image
                  src="/icon.png"
                  alt="YourMCList Logo"
                  width={48}
                  height={48}
                  priority
                  className="object-cover group-hover:scale-105 transition-transform w-10 h-10 md:w-12 md:h-12"
              />
            </div>
            <span className="font-black text-xl tracking-tight hidden sm:block">
            YOUR<span className="text-gray-500">MCLIST</span>
          </span>
          </Link>

          {/* Desktop navigation (md and up) */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
            ))}

            <div className="h-6 w-px bg-gray-200 mx-3" aria-hidden="true" />

            {session ? (
                <div className="flex items-center gap-4">
                  <Link
                      href="/serverliste/addserver"
                      className="px-4 py-2 rounded-lg bg-black text-white text-sm font-bold hover:bg-zinc-800 transition-all shadow-sm active:scale-95 whitespace-nowrap"
                  >
                    + Add Server
                  </Link>

                  <Link
                      href="/profile"
                      className="flex items-center gap-3 group"
                      aria-label="Profil öffnen"
                  >
                    <div className="hidden lg:flex flex-col items-end">
                      <p className="text-xs font-bold leading-none">{session.user?.name}</p>
                      <p className="text-[10px] text-gray-500">Member</p>
                    </div>
                    {avatar}
                  </Link>

                  <ButtonSignOut />
                </div>
            ) : (
                <ButtonSign />
            )}
          </nav>

          {/* Mobile navigation (below md) */}
          <div className="flex items-center gap-2 md:hidden">
            {session ? (
                <Link href="/profile" className="group" aria-label="Profil öffnen">
                  {avatar}
                </Link>
            ) : (
                <ButtonSign />
            )}

            <MobileMenu>
              {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={mobileLinkClass}>
                    {link.label}
                  </Link>
              ))}

              {session && (
                  <>
                    <div className="my-2 h-px bg-gray-100" aria-hidden="true" />

                    <Link
                        href="/serverliste/addserver"
                        className="block text-center px-4 py-3 rounded-lg bg-black text-white text-sm font-bold hover:bg-zinc-800 transition-all active:scale-95"
                    >
                      + Add Server
                    </Link>

                    <div className="flex items-center justify-between gap-3 px-3 pt-3">
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate">{session.user?.name}</p>
                        <p className="text-[11px] text-gray-500">Member</p>
                      </div>
                      <ButtonSignOut />
                    </div>
                  </>
              )}
            </MobileMenu>
          </div>
        </div>
      </header>
  )
}

export default Header