
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  await connectToDB();
  const users = await User.find().select('-password'); // Hide password
  return NextResponse.json(users);
}
