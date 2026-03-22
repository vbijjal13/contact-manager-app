import { ContactType, CreateContactType } from '../_types/types';
import { getUserSession } from './session';

const API_BASE_URL = 'http://localhost:3000/api/contacts';

/**
 * Contact Service - Utility functions for contacting with the contacts API
 */

/**
 * Fetch all contacts for a specific user
 */
export async function getContacts(userId: string): Promise<ContactType[]> {
  try {
    console.log('Fetching contacts for userId:', userId);
    const response = await fetch(`${API_BASE_URL}?userId=${userId}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch contacts');
    }

    const data = await response.json();
    console.log('Contacts fetched successfully:', data.contacts);
    return data.contacts || [];
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

/**
 * Add a new contact
 */
export async function addContact(contact: CreateContactType): Promise<ContactType> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add contact');
    }

    const data = await response.json();
    return data.contact;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
}

/**
 * Update an existing contact
 */
export async function updateContact(
  contactId: string,
  contact: CreateContactType
): Promise<ContactType> {
  try {
    const user = await getUserSession();
    const body = { ...contact, userId: user?.id };
    const response = await fetch(`${API_BASE_URL}/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update contact');
    }

    const data = await response.json();
    return data.contact;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
}

/**
 * Delete a contact
 */
export async function deleteContact(contactId: string): Promise<void> {
  try {
    const user = await getUserSession();
    const response = await fetch(`${API_BASE_URL}/${contactId}?userId=${encodeURIComponent(user?.id || '')}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete contact');
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
}

/**
 * Format full name from first and last name
 */
export function formatFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}

/**
 * Format phone number with country code
 */
export function formatPhone(countryCode: string, phoneNumber: string): string {
  return `${countryCode} ${phoneNumber}`;
}
