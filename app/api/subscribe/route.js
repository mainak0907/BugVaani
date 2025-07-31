// app/api/subscribe/route.js

import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { name, email } = await req.json();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !emailRegex.test(email)) {
    return NextResponse.json({ message: 'Invalid name or email address.' }, { status: 422 });
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('subscribers');

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      await client.close();
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    await collection.insertOne({ name, email });
    await client.close();

    return NextResponse.json({ message: 'Name and email stored successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return NextResponse.json({ message: 'Storing name and email failed.' }, { status: 500 });
  }
}
