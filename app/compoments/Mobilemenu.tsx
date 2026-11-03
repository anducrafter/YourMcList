"use client"

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function MobileMenu({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    // Close the menu after navigating to another page
    useEffect(() => {
        setOpen(false)
    }, [pathname])

    return (
        <div className="md:hidden">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-black hover:bg-gray-100 transition-colors"
            >
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                >
                    {open ? (
                        <path d="M6 6l12 12M18 6L6 18" />
                    ) : (
                        <path d="M4 7h16M4 12h16M4 17h16" />
                    )}
                </svg>
            </button>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="absolute inset-x-0 top-full border-b border-gray-100 bg-white shadow-lg"
                >
                    <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">{children}</div>
                </div>
            )}
        </div>
    )
}
