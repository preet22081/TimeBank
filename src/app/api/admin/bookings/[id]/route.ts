// File: /app/api/admin/users/[id]/route.ts
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();

    const url = new URL(req.url);
    const id = url.pathname.split('/').at(-2); // Extract user ID

    const user = await User.findByIdAndUpdate(
      id,
      body, // directly update with the provided fields
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error('[USER_UPDATE_ERROR]', err);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
