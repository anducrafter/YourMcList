import { Mail, MessageSquare, Lightbulb } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-3xl font-black tracking-tighter uppercase">Get in Touch</h1>
        <p className="text-neutral-500 text-sm">Have a suggestion or need help? We're listening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information Card */}
        <div className="p-8 border border-neutral-200 rounded-3xl bg-white shadow-sm">
          <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6">
            <Mail className="w-6 h-6 text-black" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight mb-2">Email Support</h2>
          <p className="text-neutral-500 text-sm mb-6">
            For technical issues, partnership inquiries, or general questions, drop us a line at:
          </p>
          <a 
            href="mailto:info@yourmclist.com" 
            className="inline-block text-lg font-mono font-bold border-b-2 border-black hover:text-neutral-500 transition-colors"
          >
            info@yourmclist.com
          </a>
        </div>

        {/* Suggestions Card */}
        <div className="p-8 border border-neutral-200 rounded-3xl bg-white shadow-sm">
          <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6">
            <Lightbulb className="w-6 h-6 text-black" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight mb-2">Suggestions</h2>
          <p className="text-neutral-500 text-sm mb-6">
            We want to build the best Minecraft server list. Tell us what features you'd like to see next.
          </p>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-full uppercase">
              Community Driven
            </div>
          </div>
        </div>
      </div>

      {/* FAQ / Info Section matching the "Server List" style */}
      <div className="mt-12">
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">Quick Info</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-5 border border-neutral-200 rounded-2xl bg-white hover:border-black transition-all group">
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-bold">Response Time</h4>
                <p className="text-xs text-neutral-400 font-mono">Usually within 24-48 hours</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-5 border border-neutral-200 rounded-2xl bg-white hover:border-black transition-all group">
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-bold">Server Submissions</h4>
                <p className="text-xs text-neutral-400 font-mono">Manual review may take up to 12h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}