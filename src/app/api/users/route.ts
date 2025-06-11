import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const users = await User.find();
  return NextResponse.json(users, { status: 200 });
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
