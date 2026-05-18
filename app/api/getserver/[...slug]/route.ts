import { NextRequest, NextResponse } from 'next/server';

// 1. Define the type for the context (if using TypeScript)
type Context = {
  params: Promise<{ slug: string[] }> 
}

export async function GET(req: NextRequest, context: Context) {
  // 2. Await the params!
  const { slug } = await context.params;
  
  // Now you can use slug (which is an array, e.g., ["part1", "part2"])
  console.log(slug);

  return NextResponse.json({ message: "Success", slug });
}