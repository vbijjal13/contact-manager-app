import React from 'react';
import { getUserSession } from '../_lib/session';
import { getContacts } from '../_lib/contactService';
import ContactList from '@/app/_components/ContactList';
import Image from 'next/image';
import { ContactType } from '../_types/types';

export default async function ContactPage() {
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <Image
              src="/globe.svg"
              alt="Contacts"
              width={64}
              height={64}
              className="mx-auto text-gray-400"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Your Contacts
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view and manage your contacts.
            Please register or login to continue.
          </p>
          <div className="space-y-3">
            <a
              href="/login"
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Login
            </a>
            <a
              href="/register"
              className="block w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Fetch contacts for the logged-in user
  let contacts: ContactType[] = [];
  try {
    contacts = await getContacts(user.id);
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    // We'll handle this in the ContactList component
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Teaser Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <Image
                src="/globe.svg"
                alt="Contacts"
                width={80}
                height={80}
                className="mx-auto filter brightness-0 invert"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Your Contact Manager
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Keep all your important contacts organized and easily accessible.
              Add, edit, and manage your personal and professional connections in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Contacts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Contacts ({contacts.length})
          </h2>
          <p className="text-gray-600">
            Manage your contacts with ease. Click on any contact to edit, copy details, or delete.
          </p>
        </div>

        {contacts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No contacts yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start building your contact list by adding your first contact.
            </p>
            <ContactList initialContacts={contacts} userId={user.id} />
          </div>
        ) : (
          <ContactList initialContacts={contacts} userId={user.id} />
        )}
      </div>
    </div>
  );
}
