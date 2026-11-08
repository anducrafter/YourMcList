import React from 'react';
import Link from "next/link";

type ThreadItem = {
    id: string;
    slug: string;
    title: string;
    categoryId: string;
    authorId: string;
    pinned: boolean;
    locked: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    lastPostAt: Date;
    postCount: number;
    viewCount: number;
};

const ListThreads = ({ thread }: { thread: ThreadItem }) => {
    return (
        <Link
            href={`/forum/thread/${thread.slug}_${thread.id}`}
            className="block rounded-lg border p-4 hover:bg-gray-50"
        >
            <h2 className="text-lg font-semibold">
                {thread.title}
            </h2>
            <p className="text-sm text-gray-500">
                {thread.postCount} replies · {thread.lastPostAt.toLocaleDateString("de-CH")}
            </p>
        </Link>
    );
};

export default ListThreads;