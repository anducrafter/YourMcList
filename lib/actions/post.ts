'use server'
import { auth } from '@/auth'
import { prisma } from '@/lib/actions/prisma'
import { revalidatePath } from 'next/cache'
import {Role} from "@/lib/generated/prisma/enums";

export async function createPost(data: { title: string; img: string, slug: string; content: string,beschreibung: string, tags:string  }) {
    const session = await auth()
    if (!session) throw new Error('Unauthorized') // later: check for admin role too

    const user = await prisma.user.findUnique( {
        where: {
            id : session.user?.id,
        },
    });


    if(user?.role !== Role.ADMIN) {
        revalidatePath('/blog')
    }else {
        const post = await prisma.postblog.create({
            data: { ...data, published: true },
        })
        revalidatePath('/blog')
        return post.slug
    }


}
