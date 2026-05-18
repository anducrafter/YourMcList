"use client"
import React, { FormEvent, useState } from 'react';

// ... (Interface remains the same)
interface ServerApiData {
    serverid: string;
    ip: string;
    servername: string;
    // ... other fields
}

interface SubmitMcNameProps {
  api: ServerApiData;
}

const SubmitMcName: React.FC<SubmitMcNameProps> = ({ api }) => {
  // 1. Add state to track if the vote is finished or currently loading
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  async function sendMcName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    formData.append('serverId', String(api.serverid));

    try {
      const response = await fetch('/api/actions/vote', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // 2. Set voted to true on success
        setVoted(true);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  // 3. If voted, show a success message instead of the form
  if (voted) {
    return (
      <div className="w-full max-w-lg mb-6 animate-in fade-in zoom-in duration-300">
        <div className="flex items-center gap-3 bg-neutral-100 border border-neutral-200 p-4 rounded-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-lg">
            ✓
          </div>
          <div>
            <p className="text-sm font-bold text-black uppercase tracking-tight">Vote Registered!</p>
            <p className="text-[11px] text-neutral-500 font-medium">Thank you for supporting {api.servername}.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mb-6">
      <form 
        onSubmit={sendMcName} 
        className="flex flex-col sm:flex-row items-stretch gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            name="mcname"
            required
            disabled={loading}
            placeholder="Type your MC name"
            className="w-full h-12 bg-white rounded-xl border border-neutral-200 px-4 text-sm font-medium transition-all focus:border-black focus:ring-1 focus:ring-black outline-none placeholder:text-neutral-400 text-black disabled:opacity-50"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="h-12 px-8 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl transition-transform active:scale-95 shadow-sm uppercase tracking-wider text-[11px] disabled:bg-neutral-400"
        >
          {loading ? 'Processing...' : 'Vote'}
        </button>
      </form>
      
      <p className="mt-2 text-[10px] text-neutral-400 font-bold uppercase tracking-widest text-center md:text-left">
        Required to claim rewards in-game
      </p>
    </div>
  );
};

export default SubmitMcName;