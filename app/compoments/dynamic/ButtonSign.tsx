
"use client"
import { login } from '@/lib/actions/auth'
import React from 'react'

export  const  ButtonSign = () => {
  return (
       <button 
     onClick={() => login()}
      className="px-4 py-2 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition"
    >
      Sign in
    </button>
  )
}
