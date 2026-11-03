import React from 'react';
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {prisma} from "@/lib/actions/prisma";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) =>{
   const {slug} = await params;
    const decoded = decodeURIComponent(slug);
    const blognme = decoded.split("&")[1];
    const user = await auth();
    if(blognme == undefined) {
        return redirect("/forum");
    }
    const category = await prisma.category.findUnique({where :{id: blognme}});
    if(category == undefined) {
        return redirect("/forum");
    }
    return (
        <div className="flex flex-col justify-center items-center mt-5">
            <section>
                <h1>Create an Thead</h1>
            </section>

            <form method="POST" action="/createThread">
                <input type="b                  "></input>
            </form>
        </div>
    );
};

export default Page;