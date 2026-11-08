import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/actions/prisma";
import {auth} from "@/auth";
import {threadId} from "node:worker_threads";
import {redirect} from "next/navigation";


export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const session = await auth();
    const userId = session?.user?.id;
    const slug = <string> formData.get("threadId")?.toString();
    const threadid = decodeURIComponent(slug).split("_").pop();
    if (!userId) {
        return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });
    }
    if(!threadid){
        return NextResponse.json({ error: "Felder fehlen" }, { status: 400 });
    }

    const rawContent = formData.get("content")?.toString();
    if (!rawContent ) {
        return NextResponse.json({ error: "Felder fehlen" }, { status: 400 });
    }



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

 const post = await prisma.post.create({
     data: {
         authorId: userId,
         content: doc,
         contentText: extractText(doc).trim(),
         isFirst: false,
         threadId: threadid,
     }
 })

    const thread = await prisma.thread.update({
        where: { id: threadid },
        data: {
            postCount: { increment: 1 },
            lastPostAt: new Date(),
        },
    });
    return  redirect(`/forum/thread/${slug}`);
}