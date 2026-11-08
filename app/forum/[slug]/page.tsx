import React from 'react';
import {prisma} from "@/lib/actions/prisma";
import {notFound, redirect} from "next/navigation";
import {auth} from "@/auth";
import Link from "next/link";
import ListThreads from "@/app/forum/[slug]/listThreads";


const Page  = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const {slug}  = await params;
    const decoded = decodeURIComponent(slug);
    const blognme = decoded.split("_")[1];
    const user = await auth();
    if(blognme == undefined) {
        return redirect("/forum");
    }
    const category1 = await prisma.category.findUnique({where :{id: blognme}});
    if(category1 == undefined) {
        return redirect("/forum");
    }
    const threads = await prisma.thread.findMany({where:{categoryId: category1.id}});
    console.log(threads);
    const b = threads.length > 0;

    return (
        <>
            <section title={"H1 header"} className="flex w-full flex-col items-center justify-center gap-2 p-5 text-center">
                <h1 className="text-3xl font-semibold tracking-tight">{category1.name}</h1>
                <p className="max-w-2xl text-xl font-medium text-gray-700">
                    {category1.beschreibung}
                </p>
                <p className="pt-3 text-lg text-gray-500">
                    Start a new discussion or join a conversation that's already underway.
                </p>
            </section>

            {user ? (
                <section title={"create Thread"} className="flex w-full flex-col items-center justify-center gap-2 p-5 text-center">
               <Link href={"post?category="+decoded} className="text-xl font-semibold tracking-tight text-white bg-black p-5 rounded-lg">
                   Create thread
               </Link>
                </section>
            ) : (
               <></>
            )}

            {threads.length > 0 ? (
                <ul className="mx-auto flex w-full max-w-3xl flex-col gap-3 p-5">
                    {threads.map((thread) => (
                        <li key={thread.id}>
                            <ListThreads thread={thread}></ListThreads>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="p-5 text-center">Noch keine Threads</div>
            )}




        </>
    );
};

export default Page;