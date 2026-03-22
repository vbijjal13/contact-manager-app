import { NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3001';

// PUT - Update a contact by ID and userId
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Update contact with id:', id);
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

    const url = `${API_URL}/contacts/${id}`;
    console.log('Fetching contact for update from URL:', url);

    // First, verify the contact exists and belongs to the user
    const getResponse = await axios.get(url);
    const existingContact = getResponse.data;
    console.log('Existing contact data:', existingContact);

    if (!existingContact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    if (existingContact.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized: Contact does not belong to this user' },
        { status: 403 }
      );
    }

    // Update the contact
    const updateData = {
      ...existingContact,
      firstName,
      lastName,
      email,
      phoneNumber,
      countryCode,
      updatedAt: new Date().toISOString(),
    };

    const response = await axios.put(url, updateData);
    const contact = response.data;

    console.log('Updated contact:', contact);
    return NextResponse.json(
      { success: true, message: 'Contact updated successfully', contact },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Update contact error', err);
    if (err.response?.status === 404) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a contact by ID and userId
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Delete contact with id:', id);
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId query parameter is required' },
        { status: 400 }
      );
    }

    const url = `${API_URL}/contacts/${id}`;
    console.log('Fetching contact for deletion from URL:', url);
    // First, verify the contact exists and belongs to the user
    const getResponse = await axios.get(url);
    const contact = getResponse.data;

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    if (contact.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized: Contact does not belong to this user' },
        { status: 403 }
      );
    }

    // Delete the contact
    await axios.delete(url);

    return NextResponse.json(
      { success: true, message: 'Contact deleted successfully' },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Delete contact error', err);
    if (err.response?.status === 404) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}
