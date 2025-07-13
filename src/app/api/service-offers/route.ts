// src/app/api/service-offers/route.ts
import { connectToDB } from '@/lib/mongodb';
import ServiceOffer from '@/models/ServiceOffer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectToDB();
  const body = await req.json();

  try {
    const offer = await ServiceOffer.create(body);
    return NextResponse.json(offer, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const filters: any = {};

  if (searchParams.has('skill')) {
    filters.category = { $regex: searchParams.get('skill'), $options: 'i' };
  }

  if (searchParams.has('date')) {
    filters.availableDate = searchParams.get('date');
  }

  try {
    const offers = await ServiceOffer.find(filters);
    return NextResponse.json(offers);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
  }
}

