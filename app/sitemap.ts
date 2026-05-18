import { prisma } from '@/lib/actions/prisma'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Alle Server abrufen
  const servers = await prisma.mcServer.findMany({
    select: {
      serverid: true,
      servername: true,
      updatedAt: true,
    }
  });

  // 2. Statische Routen
  const staticRoutes = [
    { url: 'https://yourmclist.com', lastModified: new Date() },
    { url: 'https://yourmclist.com/addserver', lastModified: new Date() },
    { url: 'https://yourmclist.com/help/votify', lastModified: new Date() },
    { url: 'https://yourmclist.com/help/alredyadded', lastModified: new Date() },
    { url: 'https://yourmclist.com/help/contact', lastModified: new Date() },
    { url: 'https://yourmclist.com/serverliste/search', lastModified: new Date() },
  ]

  // 3. Dynamische Routen (Korrigiert auf deine URL-Struktur: serverid-servername)
  const dynamicRoutes = servers.map((server) => ({
    // Hier bauen wir den String exakt so zusammen, wie du ihn vorgegeben hast
    url: `https://yourmclist.com/serverliste/server/${server.serverid}-${server.servername}`,
    // Falls updatedAt null ist, nutzen wir das aktuelle Datum
    lastModified: server.updatedAt || new Date(),
  }))

  return [...staticRoutes, ...dynamicRoutes]
}