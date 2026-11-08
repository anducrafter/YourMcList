import React from 'react';
import {prisma} from "@/lib/actions/prisma";
import { notFound } from "next/navigation";
import PostContent from "@/app/forum/thread/[slug]/PostContent";
import {SimpleEditorExtended} from "@/app/forum/post/testEditor";
import {auth} from "@/auth";
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const user = await auth();
    const threadId = decodeURIComponent(slug).split("_").pop();
    if (!threadId) notFound();

    let content = (<div></div>);
    if (user){
        content = (
            <section className="mt-6 rounded-lg border p-4">
                <form action="/api/actions/addPost" method="POST" >
                    <h2 className="text-lg font-semibold px-4 pb-2">Create your Post</h2>
                    <SimpleEditorExtended></SimpleEditorExtended>
                    <input type="hidden"  name={"threadId"} value={slug} />
                    <input className="text-lg font-semibold mt-6 p-4 bg-black rounded-xl text-white" type="submit" value="Add thread" />
                </form>

            </section>
        )
    }

    const thread = await prisma.thread.findUnique({
        where: { id: threadId },
        include: {
            posts: {
                where: { deletedAt: null },
                orderBy: { createdAt: "asc" },
                include: { author: { select: { name: true } } },
            },
        },
    });


    if (!thread || thread.deletedAt) notFound();

    return (
        <div className="mx-auto max-w-3xl p-5">
            <h1 className="text-3xl font-semibold">{thread.title}</h1>

            {thread.posts.map((post) => (
                <article key={post.id} className="mt-6 rounded-lg border p-4">
                    <p className="mb-2 text-sm text-gray-500">
                        {post.author.name} · {post.createdAt.toLocaleDateString("de-CH")}
                    </p>
                    <PostContent json={post.content} />
                </article>
            ))}

            {content}
        </div>
    );
};

export default Page;