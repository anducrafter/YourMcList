import { ArrowRight, Settings, User, Edit3, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function VotifierPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-12">
        <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs mb-2">Documentation</p>
        <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">Setting up Votifier</h1>
        <p className="text-neutral-600 max-w-2xl">
          Reward your players for voting. Connect your server to our system using Votifier or NuVotifier to automate rewards and climb the rankings.
        </p>
      </div>

      {/* Step-by-Step Guide */}
      <div className="grid grid-cols-1 gap-12">
        
        {/* Step 1 */}
        <section className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-xs font-black">1</span>
              <h2 className="text-xl font-black uppercase tracking-tight">Access your Dashboard</h2>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed mb-4">
              Log in to your account and click on your <strong>Profile</strong> or <strong>Dashboard</strong>. 
              You will see a list of all the Minecraft servers you have currently listed on our platform.
            </p>
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center gap-3">
              <User className="w-5 h-5 text-neutral-400" />
              <span className="text-xs font-mono text-neutral-500 underline">yourmclist.com/profile</span>
            </div>
          </div>
          <div className="flex-1 w-full p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm">
             {/* Visual representation of the "My Servers" card */}
             <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl bg-neutral-50 opacity-60 scale-95">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-200 rounded-lg" />
                  <div className="h-4 w-24 bg-neutral-200 rounded" />
                </div>
                <div className="px-4 py-2 bg-black text-white text-[10px] font-bold rounded-lg">Edit Settings</div>
             </div>
          </div>
        </section>

        <hr className="border-neutral-100" />

        {/* Step 2 */}
        <section className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 order-1 md:order-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-xs font-black">2</span>
              <h2 className="text-xl font-black uppercase tracking-tight">Enter Votifier Details</h2>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed mb-4">
              Once you click <strong>Edit</strong>, scroll down to the Votifier section. Here you need to provide three pieces of information from your server's <code className="bg-neutral-100 px-1 rounded text-black font-bold">config.yml</code>:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-xs font-bold text-neutral-700">
                <ArrowRight className="w-3 h-3" /> VOTIFIER IP (OR HOSTNAME)
              </li>
              <li className="flex items-center gap-2 text-xs font-bold text-neutral-700">
                <ArrowRight className="w-3 h-3" /> VOTIFIER PORT (DEFAULT: 8192)
              </li>
              <li className="flex items-center gap-2 text-xs font-bold text-neutral-700">
                <ArrowRight className="w-3 h-3" /> PUBLIC KEY (RSA)
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full order-2 md:order-1">
            <div className="p-8 border-2 border-black rounded-3xl bg-white space-y-4">
               <div className="space-y-1">
                 <label className="text-[10px] font-black uppercase text-neutral-400">Votifier IP</label>
                 <div className="w-full h-10 border border-neutral-200 rounded-lg bg-neutral-50" />
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] font-black uppercase text-neutral-400">Votifier Key</label>
                 <div className="w-full h-20 border border-neutral-200 rounded-lg bg-neutral-50" />
               </div>
               <button className="w-full py-3 bg-black text-white text-xs font-black uppercase rounded-xl">Save Changes</button>
            </div>
          </div>
        </section>

      </div>

      {/* Help Footer */}
      <div className="mt-20 p-10 bg-neutral-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight uppercase">Need more help?</h2>
          <p className="text-neutral-400 text-sm">If your votes aren't sending, contact our support team.</p>
        </div>
        <Link 
          href="/help/contact" 
          className="px-8 py-4 bg-white text-black font-black text-xs uppercase rounded-2xl hover:bg-neutral-200 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </main>
  );
}