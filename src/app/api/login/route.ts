import { NextResponse } from 'next/server';
import axios from 'axios';
import { setUserSession } from '@/app/_lib/session';

const API_URL = process.env.API_URL || 'http://localhost:3001';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const response = await axios.get(`${API_URL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    const user = response.data?.[0];
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    const userResponse = { id: user.id, name: user.name, email: user.email };
    
    await setUserSession(userResponse);
    const res = NextResponse.json({ success: true, user: userResponse }, { status: 200 });
    return res;
  } catch (err) {
    console.error('Login route error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
