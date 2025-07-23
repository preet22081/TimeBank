import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const deletedUser = await User.findByIdAndDelete(params.id);
    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[DELETE_USER_ERROR]', err);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
