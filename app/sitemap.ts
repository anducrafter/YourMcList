import { prisma } from '@/lib/actions/prisma'
import { MetadataRoute } from 'next'
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Alle Server abrufen
  const servers = await prisma.mcServer.findMany({
    select: {
      serverid: true,
      servername: true,
      updatedAt: true,
    }
  });

  const blogs = await  prisma.postblog.findMany( {
    where: {published: true},
  });

  // 2. Statische Routen
  const staticRoutes = [
    { url: 'https://yourmclist.com', lastModified: new Date() },
    { url: 'https://yourmclist.com/serverliste/addserver', lastModified: new Date() },
    { url: 'https://yourmclist.com/help/votify', lastModified: new Date() },
    { url: 'https://yourmclist.com/help/alredyadded', lastModified: new Date() },
    { url: 'https://yourmclist.com/help/contact', lastModified: new Date() },
    { url: 'https://yourmclist.com/serverliste/search', lastModified: new Date() },
    { url: 'https://yourmclist.com/blog', lastModified: new Date() },
  ]

  // 3. Dynamische Routen (Korrigiert auf deine URL-Struktur: serverid-servername)
  const dynamicRoutes = servers.map((server) => ({
    // Hier bauen wir den String exakt so zusammen, wie du ihn vorgegeben hast
    url: `https://yourmclist.com/serverliste/server/${server.serverid}-${server.servername}`,
    // Falls updatedAt null ist, nutzen wir das aktuelle Datum
    lastModified: server.updatedAt || new Date(),
  }))

  const dynamicRoutes2 = blogs.map((server) => ({
    // Hier bauen wir den String exakt so zusammen, wie du ihn vorgegeben hast
    url: `https://yourmclist.com/blog/${server.slug}`,
    // Falls updatedAt null ist, nutzen wir das aktuelle Datum
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...dynamicRoutes, ...dynamicRoutes2]
}