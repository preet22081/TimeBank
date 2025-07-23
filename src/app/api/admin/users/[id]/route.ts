import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').at(-2); // extract user id from URL

  await connectToDB();

  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Parse request body for fields to update (for example, 'status' or 'isActive')
    const body = await req.json();

    // Example: check if already active (or approved)
    if (user.status === 'active' && body.status === 'active') {
      return NextResponse.json({ message: 'User already active' }, { status: 200 });
    }

    // Update the user's fields (customize as needed)
    if (body.status) user.status = body.status;
    if (typeof body.isActive === 'boolean') user.isActive = body.isActive;

    await user.save();

    return NextResponse.json({ message: 'User updated successfully', user });
  } catch (err: any) {
    console.error('❌ User update error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
