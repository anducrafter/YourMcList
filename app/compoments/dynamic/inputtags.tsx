"use client"

import { useEffect, useMemo, useRef, useState } from "react";

type Selection = {
  plugins: string[];
  gamemodes: string[];
 
  mods: string[];
};

const DATA = {
  plugins: ["Essentials", "WorldEdit", "LuckPerms", "Vault", "WorldEdit", "LuckPerms", "Vault", "WorldEdit", "LuckPerms", "Vault", "WorldEdit", "LuckPerms", "Vault", "WorldEdit", "LuckPerms", "Vault", "WorldEdit", "LuckPerms", "Vault","gaming"],
  gamemodes: ["Survival", "Creative", "Skyblock", "PvP"],
 
  mods: ["OptiFine", "JEI", "JourneyMap", "Biomes O' Plenty"],
};

const MultiDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [selection, setSelection] = useState<Selection>({
    plugins: [],
    gamemodes: [],
  
    mods: [],
  });

const jsonValue = useMemo(() => {
  if (!selection || Object.values(selection).every(v => !v || v.length === 0)) {
    return "";
  }

  return JSON.stringify(selection);
}, [selection]);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleItem = (category: keyof Selection, item: string) => {
    setSelection(prev => {
      const exists = prev[category].includes(item);
      return {
        ...prev,
        [category]: exists
          ? prev[category].filter(v => v !== item)
          : [...prev[category], item],
      };
    });
  };

  const removeTag = (category: keyof Selection, item: string) => {
    setSelection(prev => ({
      ...prev,
      [category]: prev[category].filter(v => v !== item),
    }));
  };

  const allTags = Object.entries(selection).flatMap(
    ([category, items]) =>
      items.map(item => ({
        category: category as keyof Selection,
        item,
      }))
  );

  return (
    <div ref={ref} className="relative w-full">
      {/* hidden input for form submit */}
      <input  required  type="hidden" name="config" value={jsonValue} />

      {/* visible input */}
      <div
        onClick={() => setIsOpen(true)}
        className="mt-2 flex min-h-[42px] w-full cursor-text flex-wrap items-center gap-2 rounded-lg border border-neutral-300 bg-white p-2 text-sm shadow-sm focus-within:border-black"
      >
        {allTags.length === 0 && (
          <span className="text-neutral-400">
            Select plugins, gamemode and mods
          </span>
        )}

        {allTags.map(({ category, item }) => (
          <span
            key={`${category}-${item}`}
            className="flex items-center gap-1 rounded-full bg-black px-2 py-1 text-xs text-white"
          >
            {item}
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                removeTag(category, item);
              }}
              className="ml-1 text-white/70 hover:text-white"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-lg bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="grid grid-cols-3 gap-4 text-sm">
            {(Object.keys(DATA) as Array<keyof Selection>).map(category => (
              <div key={category}>
                <div className="mb-2 font-semibold capitalize">
                  {category}
                </div>
                <ul className="space-y-1">
                  {DATA[category].map(item => {
                    const active = selection[category].includes(item);
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          onMouseDown={() =>
                            toggleItem(category, item)
                          }
                          className={`w-full rounded px-2 py-1 text-left ${
                            active
                              ? "bg-black text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {item}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;