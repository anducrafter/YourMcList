import React from 'react';
import {SimpleEditor} from "@/components/tiptap-templates/simple/simple-editor";
import PostForm from "@/app/blog/post/new/PostForm";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

const Page = async () => {
    const session = await auth()
    if(!(session)) { return redirect("/")}
    return (
       <PostForm></PostForm>

    );
};

export default Page;