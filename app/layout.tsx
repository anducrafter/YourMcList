import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { traceGlobals } from "next/dist/trace/shared";
import "./globals.css";

import Header from "./compoments/header";
import Footer from "./compoments/footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "YourMCList | Discover the Best Minecraft Servers",
    template: "%s | YourMCList"
  },
  description: "Find and play on the best Minecraft servers. Browse our curated list of top-rated Java and Bedrock servers with detailed stats, player counts, and reviews.",
  keywords: ["Minecraft Server List", "Best MC Servers", "Minecraft Java Servers", "Minecraft Bedrock Servers", "Top Minecraft Servers"],
  openGraph: {
    title: "YourMCList | Discover the Best Minecraft Servers",
    description: "Explore the ultimate directory for Minecraft servers. Find your next adventure today!",
    url: "https://yourmclist.com",
    siteName: "YourMCList",
    images: [
      {
        url: '', // Make sure to put an image at this path in your public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YourMCList | Best Minecraft Server List",
    description: "Find the best Minecraft servers in seconds.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
 
     
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen` }>
         <Header></Header>
         <main className="flex-grow">
    {/* Page Content goes here */}
     {children}
  </main>
       
        <footer className="">
        
<Footer></Footer>
     
        </footer>
       
      </body>
     
   

    </html>
  );
}
