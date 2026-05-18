"use client"

import { useEffect, useMemo, useRef, useState } from "react";

type Selection = {
  plugins: string[];
  gamemodes: string[];
  mods: string[];
  features: string[];
};

// 1. Define Props Interface
interface MultiDropdownProps {
  initialValue?: string; // Expects a JSON string like '{"plugins":["Geyser"],"gamemodes":["Survival"]}'
}

const DATA = {
  plugins: [
    "Essentials", "WorldEdit", "Economy", "Land Claims", 
    "Custom Enchants", "Cross-Play", "Jobs", "Auction House", 
    "McMMO", "BattlePass", "Rankup", "Proximity Voice",
    "VeinMiner", "ViaVersion", "PlaceholderAPI", "Geyser"
  ],
  gamemodes: [
    "Survival", "SMP", "Vanilla", "Semi-Vanilla", "Hardcore", "Anarchy",
    "Factions", "Lifesteal", "BoxPvP", "PvP", "KitPvP", "Practice",
    "Skyblock", "OneBlock", "Prison", "Economy", "Earth", "Geopolitics", "Towny",
    "Bedwars", "Skywars", "Hunger Games", "Parkour", "Creative", "Among Us",
    "Chaos Cubed", "Bullet Hell", "Pixelmon", "Cobblemon", "Dungeon Crawler"
  ],
  mods: [
    "JEI", "JourneyMap", "Biomes O' Plenty", "Create", 
    "Cobblemon", "Pixelmon", "BetterMC", "Fabric", "Forge",
    "Quilt", "Sodium", "Alex's Mobs"
  ],
  features: [
    "No-Reset", "Community", "Events", "Tournaments", 
    "Whitelisted", "No-Grief", "Adult-Only", "Cracked", 
    "Java & Bedrock", "Seasonal", "Active Staff"
  ]
};

const MultiDropdown = ({ initialValue }: MultiDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 2. Initialize state by attempting to parse the initialValue
  const [selection, setSelection] = useState<Selection>(() => {
    if (initialValue) {
      try {
        return JSON.parse(initialValue);
      } catch (e) {
        console.error("Failed to parse initial selection:", e);
      }
    }
    // Default fallback if no initialValue or parse fails
    return {
      plugins: [],
      gamemodes: [],
      mods: [],
      features: [],
    };
  });

  const jsonValue = useMemo(() => {
    if (!selection || Object.values(selection).every(v => !v || v.length === 0)) {
      return "";
    }
    return JSON.stringify(selection);
  }, [selection]);

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
      <input required type="hidden" name="config" value={jsonValue} />

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="mt-2 flex min-h-[42px] w-full cursor-pointer flex-wrap items-center gap-2 rounded-lg border border-neutral-300 bg-white p-2 text-sm shadow-sm focus-within:border-black transition-all"
      >
        {allTags.length === 0 && (
          <span className="text-neutral-400">
            Select categories, gamemodes, mods & features...
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

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-lg bg-white p-4 shadow-xl ring-1 ring-black ring-opacity-5 max-h-[400px] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            {(Object.keys(DATA) as Array<keyof Selection>).map(category => (
              <div key={category} className="flex flex-col">
                <div className="mb-2 font-bold uppercase tracking-wider text-neutral-500 text-[10px]">
                  {category}
                </div>
                <ul className="space-y-1">
                  {DATA[category].map(item => {
                    const active = selection[category]?.includes(item);
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            toggleItem(category, item);
                          }}
                          className={`w-full rounded px-2 py-1.5 text-left transition-colors ${
                            active
                              ? "bg-black text-white font-medium"
                              : "hover:bg-neutral-100 text-neutral-700"
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