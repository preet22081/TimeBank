import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const users = await User.find({}, 'name email role');
    return NextResponse.json(users);
  } catch (err) {
    console.error('[ADMIN_GET_USERS_ERROR]', err);
    return NextResponse.json({ error: 'Failed to load users' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectToDB();
  const { name, email, password, bio, skillsOffered, skillsNeeded, avatarUrl } = await req.json();

  try {
    const newUser = new User({
      name,
      email,
      password,
      bio,
      skillsOffered,
      skillsNeeded,
      avatarUrl,
    });

    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
