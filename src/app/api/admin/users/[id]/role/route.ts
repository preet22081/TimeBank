import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const id = url.pathname.split('/').at(-3); // Because the route is /users/[id]/role, id is 3rd from last

    const { role } = await req.json();

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    console.error('[USER_ROLE_UPDATE_ERROR]', err);
    return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 });
  }
}
