import Link from "next/link";
import CreateCategory from "@/app/forum/createCategory";
import { prisma } from "@/lib/actions/prisma";

async function Page() {
    const categories = await prisma.category.findMany({

    });

    // Map behält die Reihenfolge und vermeidet das Partial-Typing von Object.groupBy
    const grouped = new Map<string, typeof categories>();
    for (const category of categories) {
        const list = grouped.get(category.overtitel) ?? [];
        list.push(category);
        grouped.set(category.overtitel, list);
    }

    return (
        <div className="mx-auto max-w-5xl space-y-10 px-4 py-12">
            <div className="flex flex-col items-center justify-center text-xl font-medium">
                <CreateCategory />


                <h1 className="font-bold text-2xl">THE YOURMCLIST FORUM</h1>
                <p>Ask Question, search for Developer Jobs, and many more</p>
                <p>Here u find everything u need to start an MC Server</p>
            </div>

            {categories.length === 0 && (
                <p className="text-center text-neutral-500">Noch keine Kategorien vorhanden.</p>
            )}

            {[...grouped].map(([overtitel, items]) => (
                <section
                    key={overtitel}
                    className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
                >
                    <header className="flex items-center justify-between bg-black px-6 py-4">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white">
                            {overtitel}
                        </h2>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              {items.length} {items.length === 1 ? "Kategorie" : "Kategorien"}
            </span>
                    </header>

                    <ul className="divide-y divide-neutral-100">
                        {items.map((category) => (
                            <li key={category.id}>
                                <Link
                                    href={`/forum/${category.name.replace(" ","-")+"&"}${category.id}`}
                                    className="group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-none"
                                >
                                    <div className="min-w-0">
                                        <p className="text-lg font-bold text-black decoration-2 group-hover:underline">
                                            {category.name}
                                        </p>
                                        <p className="truncate font-medium text-neutral-500">
                                            {category.beschreibung}
                                        </p>
                                    </div>

                                    <span
                                        aria-hidden="true"
                                        className="shrink-0 text-neutral-300 transition-all group-hover:translate-x-1 group-hover:text-black"
                                    >
                    →
                  </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}

export default Page;