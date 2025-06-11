import { connectToDB } from "@/lib/mongodb";
import ServiceRequest from "@/models/ServiceRequest";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const requests = await ServiceRequest.find();
  return NextResponse.json(requests);
}

export async function POST(req: Request) {
  await connectToDB();
  const { userId, title, description, category, timeRequired } = await req.json();

  const newRequest = new ServiceRequest({
    userId,
    title,
    description,
    category,
    timeRequired,
    status: "open",
  });

  await newRequest.save();
  return NextResponse.json(newRequest, { status: 201 });
}
