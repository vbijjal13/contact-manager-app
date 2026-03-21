"use client";

import { useTransition } from 'react';
import { clearUserSession } from '../_lib/session';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      clearUserSession();
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
    >
      {isPending ? 'Logging out...' : 'Logout'}
    </button>
  );
}