"use client"
import { useEffect, useMemo, useRef, useState } from "react";
import MINECRAFT_VERSIONS from "../version";

const OPTIONS = MINECRAFT_VERSIONS;

// Define the optional prop
interface InputVersionProps {
  defaultValue?: string;
}

const InputVersion = ({ defaultValue = "" }: InputVersionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize state with the optional defaultValue
  const [query, setQuery] = useState(defaultValue);
  
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return OPTIONS;
    return OPTIONS.filter(option =>
      option.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const selectOption = (option: string) => {
    setQuery(option);
    close();
  };

  // ✅ close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        value={query}
        placeholder="Search version"
        onFocus={open}
        name="serverversion"
        onChange={e => setQuery(e.target.value)}
        className="mt-2 w-full rounded-lg border border-neutral-300 p-2 text-sm shadow-sm focus:border-black focus:outline-none"
      />

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full max-h-56 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <li key={option}>
                <button
                  type="button"
                  onMouseDown={() => selectOption(option)}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  {option}
                </button>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-gray-500">No versions found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default InputVersion;