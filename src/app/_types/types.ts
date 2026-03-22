// Shared TypeScript types for the application

/**
 * Represents a user in the app
 */
export type UserType = {
  name: string;
  email: string;
  userid: string;
};

/**
 * Represents a contact in the app
 */
export type ContactType = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  createdAt: string;
  updatedAt?: string;
};

/**
 * Type for creating/updating a contact (without id and timestamps)
 */
export type CreateContactType = Omit<ContactType, 'id' | 'createdAt' | 'updatedAt'>;

