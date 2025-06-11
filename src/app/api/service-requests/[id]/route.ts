import { connectToDB } from "@/lib/mongodb";
import ServiceRequest from "@/models/ServiceRequest";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  const request = await ServiceRequest.findById(params.id);
  if (!request) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(request);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  const data = await req.json();
  const updated = await ServiceRequest.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  await ServiceRequest.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}
