"use client";

import { useState } from "react";

type CopyIpButtonProps = {
  ip: string | null | undefined;
};

export default function CopyIpButton({ ip }: CopyIpButtonProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    if (!ip) return;

    try {
      await navigator.clipboard.writeText(ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="w-full rounded-xl border border-neutral-200 p-4 text-left hover:bg-neutral-50 transition disabled:opacity-50"
      disabled={!ip}
    >
      <div className="text-sm font-medium text-neutral-500">
        Server IP
      </div>

      <div className="mt-1 font-mono text-sm text-black break-all">
        {ip ?? "no IP"}
      </div>

      <div className="mt-2 text-xs text-neutral-500">
        {copied ? "copy" : "click to copy"}
      </div>
    </button>
  );
}