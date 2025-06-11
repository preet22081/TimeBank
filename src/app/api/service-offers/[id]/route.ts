// src/app/api/service-offers/[id]/route.ts
import { connectToDB } from "@/lib/mongodb";
import ServiceOffer from "@/models/ServiceOffer";
import { NextResponse } from "next/server";

// GET /api/service-offers/:id
export async function GET(req: Request, { params }: { params: { id: string } }) {
await connectToDB();

try {
    const offer = await ServiceOffer.findById(params.id);
    if (!offer) {
    return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }
    return NextResponse.json(offer, { status: 200 });
} catch (error) {
    return NextResponse.json({ error: "Error fetching offer" }, { status: 500 });
}
}

// PUT /api/service-offers/:id
export async function PUT(req: Request, { params }: { params: { id: string } }) {
await connectToDB();
const data = await req.json();

try {
    const updatedOffer = await ServiceOffer.findByIdAndUpdate(params.id, data, { new: true });
    if (!updatedOffer) {
    return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }
    return NextResponse.json(updatedOffer, { status: 200 });
} catch (error) {
    return NextResponse.json({ error: "Error updating offer" }, { status: 500 });
}
}

// DELETE /api/service-offers/:id
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();

  try {
    const deletedOffer = await ServiceOffer.findByIdAndDelete(params.id);
    if (!deletedOffer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Offer deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting offer" }, { status: 500 });
  }
}
