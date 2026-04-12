"use client";

import { useState } from "react";

function handleSubmit() {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    if (!host || !port) {
      setError("Bitte alle Felder korrekt ausfüllen.");
      return;
    }

    try {
      const res = await fetch("/api/addserver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ host, port }),
      });

      const data = await res.json();

      if (!data.ok) {
        setError(data.message);
        return;
      }

      // ✅ Server hinzufügen
    } catch {
      setError("Server nicht erreichbar.");
    }
  }

}

function ErrorBox({ message }: { message: string | null }) {
  return (
    <div
      className={`
        transition-all duration-300 ease-out
        overflow-hidden
        ${message ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
      `}
    >
      <div className="bg-red-500 text-white px-4 py-3 rounded-lg shadow-md">
        {message}
      </div>
    </div>
  );
}

export { handleSubmit, ErrorBox}