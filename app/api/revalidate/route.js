import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req) {
  try {
    const body = await req.json();

    const slug = body?.post_name;

    if (!slug) {
      return NextResponse.json({ message: 'Missing slug' }, { status: 400 });
    }

    revalidatePath(`/blog/${slug}`);

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
