import React from 'react';
import {prisma} from "@/lib/actions/prisma";
import {SimpleEditor} from "@/components/tiptap-templates/simple/simple-editor";
import {EditorContent, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import {redirect} from "next/navigation";


const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const {slug}  = await params;
   const blog =  await prisma.postblog.findUnique({ where: { slug } });
   if (blog == null) {
    redirect("/blog")
   }
   const content = blog?.content;
    return (
        <section className="max-w-3xl mx-auto p-6" about={"Content of Blog"} >
            <h1 className="text-3xl font-bold mb-6">{blog?.title}</h1>
            <article
                className="simple-editor-content tiptap prose"
                dangerouslySetInnerHTML={{ __html: blog?.content }}
            ></article>
        </section>
    );
};

export default Page;