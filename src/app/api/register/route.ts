import { NextResponse } from 'next/server';
import axios from 'axios';
import { setUserSession } from '@/app/_lib/session';

const API_URL = process.env.API_URL || 'http://localhost:3001';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    // Check if user already exists
    const existingResponse = await axios.get(`${API_URL}/users?email=${encodeURIComponent(email)}`);
    if (existingResponse.data.length > 0) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create new user
    const name = `${firstName} ${lastName}`;
    const userid = email; // Using email as userid for simplicity
    const newUser = {
      name,
      email,
      userid,
      password, // In a real app, hash the password
    };

    const createResponse = await axios.post(`${API_URL}/users`, newUser);
    const user = createResponse.data;

    // Set session
    const userResponse = { userid: user.userid, name: user.name, email: user.email };
    await setUserSession(userResponse);

    const res = NextResponse.json({ success: true, user: userResponse }, { status: 200 });
    return res;
  } catch (err) {
    console.error('Register route error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}