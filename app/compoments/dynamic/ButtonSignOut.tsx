
"use client"
import { login, logout } from '@/lib/actions/auth'
import { signOut } from 'next-auth/react'
import React from 'react'

export  const  ButtonSignOut = () => {
  return (
       <button 
     onClick={() => logout()}
      className="px-4 py-2 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition"
    >
      Signout
    </button>
  )
}
