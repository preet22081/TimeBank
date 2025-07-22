// File: /app/api/admin/offers/route.ts
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import ServiceOffer from '@/models/ServiceOffer';
import User from '@/models/User';

export async function GET() {
  await connectToDB();
  const offers = await ServiceOffer.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
  return NextResponse.json(offers);
}
