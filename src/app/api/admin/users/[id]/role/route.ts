// /app/api/admin/users/[id]/role/route.ts
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDB();
  const { role } = await req.json();
  await User.findByIdAndUpdate(params.id, { role });
  return NextResponse.json({ success: true });
}
