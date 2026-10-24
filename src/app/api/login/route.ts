import { NextResponse } from 'next/server';
import axios from 'axios';
import { setUserSession } from '@/app/_lib/session';

const API_URL = process.env.API_URL || 'http://localhost:3001';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const password = String(body?.password ?? '').trim();
    console.log('Login request received for email:', email);

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const url = `${API_URL}/users?email=${encodeURIComponent(email)}`;
    console.log('Fetching user from URL:', url);
    const response = await axios.get(url);
    const user = response.data?.find(
      (entry: { email?: string }) => String(entry.email ?? '').trim().toLowerCase() === email
    );

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    if (user.password !== password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    const userResponse = { id: user.id, name: user.name, email: user.email };

    await setUserSession(userResponse);
    return NextResponse.json({ success: true, user: userResponse }, { status: 200 });
  } catch (err) {
    console.error('Login route error', err);

    if (axios.isAxiosError(err)) {
      return NextResponse.json(
        { error: 'Unable to reach the authentication service. Please make sure the backend is running.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
