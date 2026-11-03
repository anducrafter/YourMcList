import React from 'react';

type threads = {
    id: string
    slug: string
    title: string
    categoryId: string
    authorId: string
    pinned: boolean
    locked: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    lastPostAt: Date | null
}
const ListThreads = (thread: threads) => {


    return (
        <article className="w-full">
            <h2>{thread.title}</h2>
        </article>
    );
};

export default ListThreads;