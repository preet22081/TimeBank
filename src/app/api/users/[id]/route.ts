import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  const user = await User.findById(params.id).select('-password');
  return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  const body = await req.json();
  try {
    const updated = await User.findByIdAndUpdate(params.id, body, { new: true }).select('-password');
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
