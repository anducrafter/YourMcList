import { NextRequest, NextResponse } from 'next/server';


type Context = {
  params: Promise<{ slug: string[] }> 
}

export async function GET(req: NextRequest, context: Context) {
  // 2. Await the params!
  const { slug } = await context.params;
  return NextResponse.json({ message: "Success", slug });
}