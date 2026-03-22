import { NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3001';

// GET - Retrieve all contacts for a specific user
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    console.log('Get contacts for userId:', userId);
    if (!userId) {
      return NextResponse.json(
        { error: 'userId query parameter is required' },
        { status: 400 }
      );
    }

    // Fetch contacts for the specified userId
    const response = await axios.get(`${API_URL}/contacts?userId=${decodeURIComponent(userId)}`);
    const contacts = response.data;
    console.log('Fetched contacts:', contacts);

    return NextResponse.json({ success: true, contacts }, { status: 200 });
  } catch (err) {
    console.error('Get contacts error', err);
    return NextResponse.json(
      { error: 'Failed to retrieve contacts' },
      { status: 500 }
    );
  }
}

// POST - Add a new contact
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, firstName, lastName, email, phoneNumber, countryCode } = body;

    // Validate required fields
    if (!userId || !firstName || !lastName || !email || !phoneNumber || !countryCode) {
      return NextResponse.json(
        {
          error: 'Missing required fields: userId, firstName, lastName, email, phoneNumber, countryCode',
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create new contact
    const newContact = {
      userId,
      firstName,
      lastName,
      email,
      phoneNumber,
      countryCode,
      createdAt: new Date().toISOString(),
    };

    const response = await axios.post(`${API_URL}/contacts`, newContact);
    const contact = response.data;

    return NextResponse.json(
      { success: true, message: 'Contact added successfully', contact },
      { status: 201 }
    );
  } catch (err) {
    console.error('Add contact error', err);
    return NextResponse.json(
      { error: 'Failed to add contact' },
      { status: 500 }
    );
  }
}
