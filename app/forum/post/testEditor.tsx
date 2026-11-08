"use client"

import { useState, useEffect } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import type { Editor } from "@tiptap/react"
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Subscript as SubscriptIcon,
    Highlighter,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Code,
    Quote,
    type LucideIcon,
} from "lucide-react"
import { forumExtensions, contentClass} from "@/app/forum/post/Extensions";

interface SimpleEditorProps {
    name?: string // Name für das Formular-Feld
    initialContent?: any // JSON-Objekt (oder HTML-String)
    onChange?: (json: any) => void
}

type ToolbarItem = {
    title: string
    icon: LucideIcon
    isActive: (e: Editor) => boolean
    run: (e: Editor) => void
}

const groups: ToolbarItem[][] = [
    [
        { title: "Fett", icon: Bold, isActive: (e) => e.isActive("bold"), run: (e) => e.chain().focus().toggleBold().run() },
        { title: "Kursiv", icon: Italic, isActive: (e) => e.isActive("italic"), run: (e) => e.chain().focus().toggleItalic().run() },
        { title: "Unterstrichen", icon: UnderlineIcon, isActive: (e) => e.isActive("underline"), run: (e) => e.chain().focus().toggleUnderline().run() },
        { title: "Durchgestrichen", icon: Strikethrough, isActive: (e) => e.isActive("strike"), run: (e) => e.chain().focus().toggleStrike().run() },
        { title: "Tiefgestellt", icon: SubscriptIcon, isActive: (e) => e.isActive("subscript"), run: (e) => e.chain().focus().toggleSubscript().run() },
        { title: "Markierung", icon: Highlighter, isActive: (e) => e.isActive("highlight"), run: (e) => e.chain().focus().toggleHighlight().run() },
    ],
    [
        { title: "Überschrift 1", icon: Heading1, isActive: (e) => e.isActive("heading", { level: 1 }), run: (e) => e.chain().focus().toggleHeading({ level: 1 }).run() },
        { title: "Überschrift 2", icon: Heading2, isActive: (e) => e.isActive("heading", { level: 2 }), run: (e) => e.chain().focus().toggleHeading({ level: 2 }).run() },
        { title: "Überschrift 3", icon: Heading3, isActive: (e) => e.isActive("heading", { level: 3 }), run: (e) => e.chain().focus().toggleHeading({ level: 3 }).run() },
    ],
    [
        { title: "Aufzählung", icon: List, isActive: (e) => e.isActive("bulletList"), run: (e) => e.chain().focus().toggleBulletList().run() },
        { title: "Nummerierte Liste", icon: ListOrdered, isActive: (e) => e.isActive("orderedList"), run: (e) => e.chain().focus().toggleOrderedList().run() },
        { title: "Zitatblock", icon: Quote, isActive: (e) => e.isActive("blockquote"), run: (e) => e.chain().focus().toggleBlockquote().run() },
        { title: "Codeblock", icon: Code, isActive: (e) => e.isActive("codeBlock"), run: (e) => e.chain().focus().toggleCodeBlock().run() },
    ],
]

export function SimpleEditorExtended({ name = "content", initialContent, onChange }: SimpleEditorProps) {
    const [jsonContent, setJsonContent] = useState<string>("")

    const editor = useEditor({
        extensions: forumExtensions, // gleiche Liste wie auf dem Server
        immediatelyRender: false, // verhindert Hydration-Fehler in Next.js
        shouldRerenderOnTransaction: true, // Toolbar-Buttons zeigen live, was aktiv ist
        content: initialContent ?? "",
        editorProps: {
            attributes: { class: `outline-none min-h-[150px] ${contentClass}` },
            // Bilddateien weder droppen noch einfügen
            handleDrop: (_v, e) => !!e.dataTransfer?.files?.length,
            handlePaste: (_v, e) => !!e.clipboardData?.files?.length,
        },
        onUpdate: ({ editor }) => {
            const json = editor.getJSON()
            setJsonContent(JSON.stringify(json))
            onChange?.(json)
        },
    })

    // Initialen JSON-Wert setzen, sobald der Editor bereit ist
    useEffect(() => {
        if (editor) setJsonContent(JSON.stringify(editor.getJSON()))
    }, [editor])

    if (!editor) return null

    const buttonClass = (active: boolean) =>
        `p-2 rounded transition-colors ${
            active
                ? "bg-muted text-foreground font-bold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`

    return (
        <div className="border border-border rounded-lg overflow-hidden bg-background">
            {/* Verstecktes Feld: schickt das JSON beim Absenden des Formulars mit */}
            <input type="hidden" name={name} value={jsonContent} readOnly />

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/40">
                {groups.map((group, i) => (
                    <div key={i} className="flex items-center gap-1">
                        {i > 0 && <div className="h-6 w-px bg-border mx-1" />}
                        {group.map(({ title, icon: Icon, isActive, run }) => (
                            <button
                                key={title}
                                type="button" // sonst würde der Klick das Formular absenden
                                title={title}
                                aria-label={title}
                                aria-pressed={isActive(editor)}
                                onClick={() => run(editor)}
                                className={buttonClass(isActive(editor))}
                            >
                                <Icon className="w-4 h-4" />
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            {/* Editor */}
            <div className="p-4">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}