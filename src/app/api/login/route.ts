import { NextResponse } from 'next/server';
import axios from 'axios';
import { use } from 'react';

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

    const userResponse = { userid: user.userid, name: user.name, email: user.email, id: user.userid };

    const res = NextResponse.json({ success: true, user: userResponse }, { status: 200 });
    // set cookie on the response
    res.cookies.set('user', JSON.stringify(userResponse), {
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return res;
  } catch (err) {
    console.error('Login route error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
