// lib/forum/extensions.ts
// EINE Extension-Liste für Editor, Server-Prüfung und Anzeige.
// Wichtig: Kein Image dabei -> Bilder sind nicht möglich.
import StarterKit from "@tiptap/starter-kit";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";

export const MAX_FORUM_TEXT = 20_000;

export const forumExtensions = [
    // Tiptap 3: Underline ist im StarterKit schon drin.
    // (Tiptap 2: zusätzlich Underline aus "@tiptap/extension-underline" einfügen)
    StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
    Subscript,
    Highlight, // ohne multicolor
];

// Tailwind setzt Überschriften, Listen usw. per "preflight" auf Normaltext zurück.
// Diese Klassen stellen das Aussehen wieder her. Gleiche Klassen im Editor UND in der Anzeige verwenden.
// (Der Ordner "lib" muss in Tailwind "content" enthalten sein; in Tailwind v4 passiert das automatisch.)
export const contentClass = [
    "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2",
    "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2",
    "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-2",
    "[&_p]:my-2",
    "[&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1",
    "[&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground",
    "[&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded-md [&_pre]:overflow-x-auto [&_pre]:font-mono [&_pre]:text-sm",
    "[&_code]:bg-muted [&_code]:px-1 [&_code]:rounded [&_code]:font-mono [&_code]:text-sm",
    "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
    "[&_mark]:bg-yellow-200 [&_mark]:rounded-sm [&_mark]:px-0.5",
    "[&_a]:text-blue-600 [&_a]:underline",
    "[&_hr]:my-4 [&_hr]:border-border",
].join(" ");