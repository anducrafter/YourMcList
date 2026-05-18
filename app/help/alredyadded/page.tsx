import { ShieldAlert, CheckCircle2, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ClaimServerPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      {/* Alert Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-6">
          <ShieldAlert className="w-8 h-8 text-black" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">Server Already Listed?</h1>
        <p className="text-neutral-500 max-w-lg mx-auto">
          If your server is already on our list but was added by someone else, don't worry. We have a process to return control to the rightful owner.
        </p>
      </div>

      {/* Ownership Transfer Process */}
      <div className="bg-white border border-neutral-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm mb-12">
        <h2 className="text-xl font-black uppercase mb-8 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> Our Verification Process
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-neutral-400">STEP 01</span>
            <h3 className="font-bold">Contact Us</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Send an email to our support team with the IP of the server you wish to claim.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-neutral-400">STEP 02</span>
            <h3 className="font-bold">Verify Identity</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Our team will ask you to perform a simple task, like adding a temporary code to your server MOTD.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-neutral-400">STEP 03</span>
            <h3 className="font-bold">Transfer</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Once ownership is confirmed, we will move the listing to your account immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Card */}
      <div className="flex flex-col items-center p-10 border border-black rounded-3xl text-center bg-white group hover:bg-neutral-50 transition-colors">
        <Mail className="w-6 h-6 mb-4" />
        <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Ready to claim your server?</h2>
        <p className="text-neutral-500 text-sm mb-6 max-w-md">
          Please include the <strong>Server IP</strong> and your <strong>Username</strong> in the email so we can process your request faster.
        </p>
        <a 
          href="mailto:info@yourmclist.com" 
          className="px-10 py-4 bg-black text-white text-xs font-black uppercase rounded-2xl flex items-center gap-3 hover:scale-[1.02] transition-transform"
        >
          Email info@yourmclist.com
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Footer Note */}
      <p className="mt-8 text-center text-xs text-neutral-400 font-medium italic">
        * Note: To prevent fraud, we manually check every claim request. This may take up to 24 hours.
      </p>
    </main>
  );
}