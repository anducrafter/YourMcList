import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center space-y-8">
        
        {/* Large Status Code */}
        <div className="space-y-2">
          <h1 className="text-9xl font-black text-neutral-200 tracking-tighter">
            404
          </h1>
          <h2 className="text-3xl font-bold text-black uppercase tracking-tight">
            Server Not Found
          </h2>
        </div>

        {/* Description */}
        <p className="text-neutral-500 text-lg max-w-md mx-auto leading-relaxed">
          The page you are looking for doesn't exist or has been moved to a different address.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-neutral-800 transition-all active:scale-95 shadow-lg shadow-black/5"
          >
            Back to Homepage
          </Link>
          
          <Link
            href="/serverliste/search"
            className="w-full sm:w-auto px-8 py-3 bg-white border border-neutral-200 text-black font-bold rounded-xl hover:bg-neutral-50 transition-all active:scale-95"
          >
            Browse Servers
          </Link>
        </div>

        {/* Subtle Footer Note */}
        <div className="pt-12 border-t border-neutral-100">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            Minecraft Server List — System Error
          </p>
        </div>
      </div>
    </main>
  )
}