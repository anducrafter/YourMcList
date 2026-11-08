import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/actions/prisma";
import {auth} from "@/auth";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });
    }

    const title = formData.get("titel")?.toString();
    const rawContent = formData.get("content")?.toString();
    const rawCategory = formData.get("category")?.toString();

    if (!title || !rawContent || !rawCategory) {
        return NextResponse.json({ error: "Felder fehlen" }, { status: 400 });
    }

    const categoryId = rawCategory.split("_").pop()!;

    let doc;
    try {
        doc = JSON.parse(rawContent);
    } catch {
        return NextResponse.json({ error: "Ungültiges JSON" }, { status: 400 });
    }

    const extractText = (node: any): string =>
        node?.type === "text"
            ? node.text ?? ""
            : (node?.content ?? []).map(extractText).join(" ");

    const thread = await prisma.thread.create({
        data: {
            title,
            slug: title.replaceAll(" ", "-"),
            categoryId,
            authorId: userId,
            posts: {
                create: {
                    authorId: userId,
                    content: doc,
                    contentText: extractText(doc).trim(),
                    isFirst: true,
                },
            },
        },
    });

    return NextResponse.json({ id: thread.id });
}