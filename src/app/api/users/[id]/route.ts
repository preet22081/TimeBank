import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();

  const user = await User.findById(params.id);
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  const data = await req.json();

  const updatedUser = await User.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updatedUser);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "User deleted" });
}
