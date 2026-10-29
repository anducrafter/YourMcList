'use server'
import { auth } from '@/auth'
import { prisma } from '@/lib/actions/prisma'
import { revalidatePath } from 'next/cache'

export async function createPost(data: { title: string; slug: string; content: string,beschreibung: string, tags:string  }) {
 /*   const session = await auth()
    if (!session) throw new Error('Unauthorized') // later: check for admin role too

*/
    const post = await prisma.postblog.create({
        data: { ...data, published: true },
    })
    revalidatePath('/blog')
    return post.slug
}