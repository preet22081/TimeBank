import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDB();
    const users = await User.find().select('-password'); // exclude password field
    return NextResponse.json(users);
  } catch (err: any) {
    console.error('[GET_USERS_ERROR]', err);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
