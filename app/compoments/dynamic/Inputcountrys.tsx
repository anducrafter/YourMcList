"use client"
import { useEffect, useMemo, useRef, useState } from "react";
import COUNTRIES from "../countrys";

const OPTIONS = COUNTRIES;

// 1. Define an interface for the component props
interface DropdownProps {
  defaultValue?: string; // The '?' makes it optional
}

// 2. Destructure defaultValue and provide an empty string as a fallback
const Dropdown = ({ defaultValue = "" }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // 3. Initialize state with the defaultValue
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
        placeholder="Search country"
        onFocus={open}
        name="servercountry"
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
            <li className="px-4 py-2 text-sm text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;