"use server";

import type { UserType } from '@/app/_types/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function setUserSession(user: UserType) {
    const cookieStore = await cookies();
    cookieStore.set('user', JSON.stringify(user), {
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });
}


export async function getUserSession(): Promise<UserType | null> {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');
    if (!userCookie) return null;
    return JSON.parse(userCookie.value) as UserType;
}

export async function clearUserSession() {
    const cookieStore = await cookies();
    // cookieStore.delete accepts either the cookie name or an options object
    cookieStore.delete({ name: 'user', path: '/' });
    redirect('/login');
}
