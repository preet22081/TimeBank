// src/app/api/service-offers/route.ts
import {connectToDB} from "@/lib/mongodb";
import ServiceOffer from "@/models/ServiceOffer";
import { NextResponse } from "next/server";

// GET /api/service-offers
export async function GET() {
await connectToDB();
const offers = await ServiceOffer.find();
return NextResponse.json(offers, { status: 200 });
}

// POST /api/service-offers
export async function POST(req: Request) {
await connectToDB();
const { userId, title, description, category, timeRequired } = await req.json();

try {
    const newOffer = new ServiceOffer({
    userId,
    title,
    description,
    category,
    timeRequired,
    });

    await newOffer.save();
    return NextResponse.json(newOffer, { status: 201 });
} catch (error) {
    return NextResponse.json({ error: "Failed to create offer" }, { status: 500 });
}
}
