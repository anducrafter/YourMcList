import React from 'react'
import Dropdown from '@/app/compoments/dynamic/Inputcountrys'
import MultiColumnDropdown from '@/app/compoments/dynamic/inputtags'
import { handleSubmit } from '@/app/compoments/dynamic/handleSubmit'
import InputVersoin from '@/app/compoments/dynamic/inputversion'

const AddServer = () => {
  return (
    <div className='max-w-7xl mx-auto my-12 px-4'>
      <div className="mb-10">
        <h1 className="text-4xl font-black text-black tracking-tight">Add Your Server</h1>
        <p className="text-neutral-500 mt-2">Get your community growing by listing your server on our platform.</p>
      </div>

      <form action="/api/addserver" method='POST'>
        <div className='grid grid-cols-12 gap-12'>
          
          {/* Main Content Column */}
          <div className='col-span-12 lg:col-span-7 space-y-10'>
            
            <section className="space-y-6 bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
              <div className="border-b border-neutral-100 pb-4">
                <h2 className='text-2xl font-bold text-black'>Core Information</h2>
                <p className="text-sm text-neutral-400">Technical details used to connect to your server.</p>
              </div>

              <div> 
                <h3 className='font-semibold text-sm uppercase tracking-wider text-neutral-600'>Server Name</h3>
                <input 
                  name='servername' 
                  required 
                  type="text" 
                  placeholder='e.g. Hypixel Network' 
                  maxLength={60} 
                  className='mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm focus:bg-white focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-all' 
                />
                <p className='text-[11px] text-neutral-400 mt-1.5 text-right'>Max 60 characters</p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex-1'>
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-600">Server IP</h3>
                  <input 
                    required  
                    name='serverip' 
                    type="text" 
                    placeholder='play.myserver.com' 
                    className='mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm focus:bg-white focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-all' 
                  />
                </div>

                <div className="">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-600">Port</h3>
                  <input
                    type="text"
                    placeholder="25565"
                    name='serverport'
                    className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm focus:bg-white focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <input
                  type="checkbox"
                  id="bedrock"
                  className="h-5 w-5 rounded-md border-gray-300 text-black focus:ring-black accent-black"
                  name='bedrock'
                />
                <label htmlFor="bedrock" className="ml-3 text-sm font-medium text-neutral-700">
                  This is a Bedrock Edition server (MCPE/Console)
                </label>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div> 
                  <h3 className='font-semibold text-sm uppercase tracking-wider text-neutral-600'>Primary Version</h3>
                  <div className="mt-2"><InputVersoin /></div>
                </div>
                <div> 
                  <h3 className='font-semibold text-sm uppercase tracking-wider text-neutral-600'>Location</h3>
                  <div className="mt-2"><Dropdown /></div>
                </div>
              </div>
            </section>

            <section className="space-y-6 bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
              <div className="border-b border-neutral-100 pb-4">
                <h2 className='text-2xl font-bold text-black'>Presentation</h2>
                <p className="text-sm text-neutral-400">Tell the world why they should join your community.</p>
              </div>

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-600">Description</h3>
                <textarea
                  name="serverdescription"
                  placeholder="Tell us about your game modes, community rules, and unique features..."
                  rows={10}
                  required 
                  maxLength={2000}
                  className="mt-2 block w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm focus:bg-white focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-all"
                />
              </div>

              <div> 
                <h3 className='font-semibold text-sm uppercase tracking-wider text-neutral-600'>Tags & Categories</h3>
                <p className='text-xs text-neutral-400 mb-2'>Select up to 5 tags (e.g., Survival, Skyblock, PvP)</p>
                <MultiColumnDropdown />
              </div>
            </section>

            <button 
              type="submit" 
              onClick={handleSubmit} 
              className='w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-zinc-800 transform active:scale-[0.98] transition-all shadow-xl shadow-black/10 text-lg'
            >
              Register Server
            </button>
          </div>

          {/* Socials Column (Sticky) */}
          <div className='col-span-12 lg:col-span-5'>
            <div className="lg:sticky lg:top-28 space-y-6">
              <section className="bg-neutral-900 text-white p-8 rounded-2xl shadow-xl">
                <h2 className='text-xl font-bold mb-1'>Social Presence</h2>
                <p className='text-sm text-neutral-400 mb-6'>Connect your community platforms (Optional)</p>
                
                <div className="space-y-4">
                  {[
                    { label: 'Website', name: 'website', ph: 'https://myserver.com' },
                    { label: 'Discord', name: 'discord', ph: 'discord.gg/myserver' },
                    { label: 'Instagram', name: 'instagram', ph: '@myserver' },
                    { label: 'TikTok', name: 'ticktock', ph: '@myserver' },
                    { label: 'YouTube', name: 'youtube',  ph: 'youtube.com/c/myserver' }
                  ].map((social) => (
                    <div key={social.name}>
                      <div className="flex items-center gap-2 mb-1.5">
                     
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{social.label}</label>
                      </div>
                      <input 
                        type="text" 
                        name={social.name} 
                        placeholder={social.ph}
                        className='w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors' 
                      />
                    </div>
                  ))}
                </div>

                <div className='mt-8 p-4 bg-neutral-800/50 rounded-xl border border-neutral-700/50'>
                  <p className='text-[11px] text-neutral-400 leading-relaxed italic'>
                    Adding social links helps players find your community faster and increases your server's trust rating.
                  </p>
                </div>
              </section>
            </div>
          </div>
          
        </div>
      </form>
    </div>
  )
}

export default AddServer;