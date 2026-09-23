import React from 'react'


type NewsItem = {
  title: string
  excerpt: string
  date: string
  image: string
}

function NewsCard({ title, excerpt, date, image }: NewsItem) {
  return (
    <div className="bg-cyan-50 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden w-full max-w-sm">
      <div className="relative aspect-video">

<img src={image} alt="" />
      </div>

      <div className="p-4 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">{excerpt}</p>
        </div>
        <time className="text-xs text-gray-400 whitespace-nowrap">{date}</time>
      </div>
    </div>
  )
}

const newsItems: NewsItem[] = [
  { title: 'News About Minecraft!', excerpt: 'Yeah about that', date: '2026-07-09', image: 'https://forum.skysucht.com/index.php?media/22-1200px-ssbu-minecraft-world-webp/' },
  { title: 'News About Minecraft!', excerpt: 'Yeah about that', date: '2026-07-08', image: 'https://forum.skysucht.com/index.php?media/22-1200px-ssbu-minecraft-world-webp/' },
  { title: 'News About Minecraft!', excerpt: 'Yeah about that', date: '2026-07-07', image: 'https://forum.skysucht.com/index.php?media/22-1200px-ssbu-minecraft-world-webp/' },
]

const Page = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <section className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center">
        {newsItems.map((item, i) => (
          <NewsCard key={i} {...item} />
        ))}
      </section>
    </main>
  )
}

export default Page