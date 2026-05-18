import { SearchFrom } from '@/app/compoments/dynamic/SearchFrom'
import SearchList from '@/app/compoments/dynamic/SearchList';
import React from 'react'
import { Metadata } from 'next';

type HomeProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 1. DYNAMIC METADATA FOR SEO
export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
    const params = await searchParams;
    const query = params.search as string;
    const country = params.country as string;
    const version = params.versions as string;

    // Default Titles
    let title = "Minecraft Server List 2026 | Find the Best Servers";
    let description = "Browse thousands of Minecraft servers by version, country, and tags. Find your new favorite server today!";

    // Custom titles based on search filters
    if (query) {
        title = `Best ${query} Minecraft Servers 2026 | YourMCList`;
        description = `Discover the top-rated ${query} Minecraft servers. Copy the IP and start playing now!`;
    } else if (country) {
        title = `Minecraft Servers in ${country} | Top 2026 List`;
        description = `The best Minecraft servers located in ${country}. Check player counts and status live.`;
    } else if (version) {
        const displayVersion = version.replace(',', '.');
        title = `Minecraft ${displayVersion} Servers | YourMCList`;
        description = `Find the best servers compatible with Minecraft version ${displayVersion}.`;
    }

    return {
        title,
        description,
        // Prevents Google from indexing every single filter combination (Duplicate Content protection)
        alternates: {
            canonical: '/serverliste/search',
        }
    };
}

async function page({ searchParams }: HomeProps) {
    const params = await searchParams;
    
    const search = params.search as string;
    const tags = params.tags as string;
    const servercountry = params.country as string;
    const version = params.versions as string;
    const page = params.page as string;
    const sort = params.sort as string

    return (
        <main>
            {/* Visible H1 for SEO - Highly important for ranking */}
            <div className="text-center mt-10">
                <h1 className="text-3xl font-black uppercase tracking-tighter">
                    {search ? `${search} Minecraft Servers` : "Minecraft Server Search"}
                </h1>
                <p className="text-neutral-500 text-sm mt-2">
                    Filter by versions, countries, and game modes
                </p>
            </div>

            <div className="mt-5 flex justify-center px-4">
                <div className="w-full max-w-5xl">
                    <SearchFrom />
                </div>
            </div>

            <SearchList 
                query={search} 
                tags={tags} 
                servercountry={servercountry} 
                version={version} 
                page={page} 
                sort={sort}
            />
        </main>
    )
}

export default page