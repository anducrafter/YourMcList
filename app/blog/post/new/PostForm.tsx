'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { createPost } from '@/lib/actions/post'
import Image from '@tiptap/extension-image';

const slugify = (s: string) =>
    s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function PostForm() {
    const [title, setTitle] = useState('')
    const [beschreibung, setbeschreibung] = useState('')
    const [tags, settags] = useState('')
    const [content, setContent] = useState('')
    const [pending, startTransition] = useTransition()
    const router = useRouter()

    const save = () =>
        startTransition(async () => {
            const slug = await createPost({ title, slug: slugify(title), content,beschreibung, tags })
            router.push(`/blog/${slug}`)
        })

    return (
        <>
            <div className="mx-auto w-full  m-10">

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm mx-20">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titel"
                        className="w-full px-6 pt-8 pb-2 text-4xl font-black tracking-tight outline-none placeholder:text-gray-300 sm:px-12 border-2 border-gray-400 "
                    />



                </div>
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white  mx-20 mt-10 max-w-2xl">
                    <input
                        value={beschreibung}
                        onChange={(e) => setbeschreibung(e.target.value)}
                        placeholder="beschreibung"
                        className="w-full px-6 pt-8 pb-2 text-4xl font-black tracking-tight outline-none placeholder:text-gray-300 sm:px-12 border-2 border-gray-400 "
                    />



                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white  mx-20 mt-10 max-w-2xl">
                    <input
                        value={tags}
                        onChange={(e) => settags(e.target.value)}
                        placeholder="tags"
                        className="w-full px-6 pt-8 pb-2 text-4xl font-black tracking-tight outline-none placeholder:text-gray-300 sm:px-12 border-2 border-gray-400 "
                    />



                </div>
                <div className="mt-6 flex flex-col justify-between items-center">
                    <p className="text-sm text-gray-500">
                        {title ? `/blog/${slugify(title)}` : 'Der Link wird aus dem Titel erzeugt'}
                    </p>
                    <button
                        onClick={save}
                        disabled={pending || !title || !content}
                        className="rounded-lg bg-black px-6 py-3 font-bold text-white transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-50"
                    >
                        {pending ? 'Speichern…' : 'Veröffentlichen'}
                    </button>
                </div>
            </div>
            <SimpleEditor onChange={setContent} />
        </>

    )
}