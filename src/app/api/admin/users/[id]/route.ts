// /app/api/admin/users/[id]/route.ts
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
