import { generateHTML } from "@tiptap/html/server";
import StarterKit from "@tiptap/starter-kit";
import type { JSONContent } from "@tiptap/core";

const extensions = [StarterKit ];

export default function PostContent({ json }: { json: unknown }) {
    let html = "";
    try {
        html = generateHTML(json as JSONContent, extensions);
    } catch {
        return <p className="text-gray-500">Content could not be displayed.</p>;
    }

    return (
        <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}