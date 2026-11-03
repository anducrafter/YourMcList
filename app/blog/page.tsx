import React from 'react'
import {prisma} from "@/lib/actions/prisma";
import Link from "next/link";
import {Role} from "@/lib/generated/prisma/enums";
import {getSession} from "next-auth/react";
import {auth} from "@/auth";


type NewsItem = {
  id: string
  img: string
  slug: string
    beschreibung: string
  title: string
  tags: string
  content: string
  published: boolean
  createdAt: Date

}

function NewsCard({ id,img,slug,beschreibung,tags,title,content,published,createdAt }: NewsItem) {
    const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);
  return (
      <Link
          href={`/blog/${slug}`}
          className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >

          <div className="relative aspect-video overflow-hidden bg-muted">
              {img ? (
                  <img
                      src={img}
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
              ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      No image
                  </div>
              )}
          </div>


          <div className="flex flex-1 flex-col gap-3 p-5">
              <time
                  dateTime={createdAt.toISOString()}
                  className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
              >
                  {createdAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                  })}
              </time>

              <h2 className="line-clamp-2 text-lg font-semibold leading-snug text-foreground">
                  {title}
              </h2>

              <p className="line-clamp-3 text-sm text-muted-foreground">
                  {beschreibung}
              </p>


              <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                  <div className="flex flex-wrap gap-2">
                      {tagList.slice(0, 3).map((tag) => (
                          <span
                              key={tag}
                              className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground"
                          >
                {tag}
              </span>
                      ))}
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white transition-colors group-hover:bg-neutral-800">
            Read
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
              </div>
          </div>
      </Link>
  )
}


const Page = async () =>  {
    const session = await auth();
    const blogItems = await prisma.postblog.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
    });
    let d = false;
if(session) {
    const user = await prisma.user.findUnique( {
        where: {
            id : session.user?.id,
        },
    });
    d = user?.role == Role.ADMIN;
}
    // @ts-ignore





  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
        <article className="flex flex-col items-center justify-between p-6">
            <h1 className={"font-bold text-3xl"}>YOURMCLIST BLOG</h1>
            <p className={"text-lg font-semibold"}>Get all the news and information about Minecraft</p>
            <p className={"text-lg "}>If u looking for tutorials or how to create an Server u are in the right place!</p>
        </article>
        {d ? (
            <div className="flex flex-col items-center justify-between p-6">
            <Link href="/blog/post/new" className={"text-lg text-white bg-black p-2 rounded-lg px-5"}>Create Post</Link>
            </div>
        ) : (
            <div>

            </div>
        )}
      <section className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center">
        {blogItems.map((item, i) => (
          <NewsCard key={i} {...item} />
        ))}
      </section>
    </main>
  )
}

export default Page