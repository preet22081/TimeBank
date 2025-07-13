// src/app/api/service-requests/route.ts
import { connectToDB } from '@/lib/mongodb';
import ServiceRequest from '@/models/ServiceRequest';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectToDB();
  const body = await req.json();

  try {
    const request = await ServiceRequest.create(body);
    return NextResponse.json(request, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });
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
    filters.preferredDate = searchParams.get('date');
  }

  try {
    const requests = await ServiceRequest.find(filters).populate('user', 'name');
    return NextResponse.json(requests);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}
