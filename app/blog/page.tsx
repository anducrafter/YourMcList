import React from 'react'
import {prisma} from "@/lib/actions/prisma";
import Link from "next/link";


type NewsItem = {
  id: string
  slug: string
  title: string
  content: string
  published: boolean
  createdAt: Date
}

function NewsCard({ id,slug,title,content,published,createdAt }: NewsItem) {
  return (
    <Link href={`/blog/${slug}`} className="bg-cyan-50 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden w-full max-w-sm">
      <div className="relative aspect-video">
      </div>
      <div className="p-4 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
          <div>
            <p>{createdAt.getDate()}/{createdAt.getMonth()}/{createdAt.getFullYear()}</p>
          </div>
      </div>
        <div className="px-4 pb-1">
            tags
        </div>
    </Link>
  )
}




const Page = async () =>  {
    const blogItems = await  prisma.postblog.findMany();
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
        <article className="flex flex-col items-center justify-between p-6">
            <h1 className={"font-bold text-3xl"}>YOURMCLIST BLOG</h1>
            <p className={"text-lg font-semibold"}>Get all the news and information about Minecraft</p>
            <p className={"text-lg "}>If u looking for tutorials or how to create an Server u are in the right palce!</p>
        </article>

      <section className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center">
        {blogItems.map((item, i) => (
          <NewsCard key={i} {...item} />
        ))}
      </section>
    </main>
  )
}

export default Page