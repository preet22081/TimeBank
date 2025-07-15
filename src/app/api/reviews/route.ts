import { connectToDB } from '@/lib/mongodb';
import Review from '@/models/Review';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectToDB();

  try {
    const { booking, reviewer, reviewee, rating, comment } = await req.json();

    const review = new Review({
      booking,
      reviewer,
      reviewee,
      rating,
      comment,
    });

    await review.save();

    return NextResponse.json({ message: 'Review submitted successfully' });
  } catch (err: any) {
    console.error('Review submission error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
