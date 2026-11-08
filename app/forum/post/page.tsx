"use server"
import React from 'react';
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {prisma} from "@/lib/actions/prisma";
import {SimpleEditorExtended} from "@/app/forum/post/testEditor";
import {gaming} from "@/app/forum/post/createPost";
type HomeProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}


const Page = async ({ searchParams }: HomeProps): Promise<React.JSX.Element>=>{
    const params = await searchParams;

    const dd = params.category;
    const blognme = dd?.toString().split("_")[1];
    const user = await auth();

    if(blognme == undefined) {
        return redirect("/forum");
    }
    const category = await prisma.category.findUnique({where :{id: blognme}});
    if(category == undefined) {
        return redirect("/forum");
    }

    return (
        <div className="">
            <section>
                <h1>Creasdfadsdfdsfate an Theaddd</h1>
1            </section>
120

            <form method="POST" action="/api/actions/createPost" className="pt-5 border-1 border-neutral-500 m-5">
                <input type="text" id={"titel"} name={"titel"} placeholder={"Thread Titel"}/>
                <SimpleEditorExtended></SimpleEditorExtended>
                <input type="submit" value="Add thread" />
                <input type="hidden" name="category" value={category.id} />
            </form>

        </div>
    );
};

export default Page;