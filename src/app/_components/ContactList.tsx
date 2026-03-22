"use client";

import { useState } from "react";
import { ContactType } from "../_types/types";
import ContactCard from "./ContactCard";
import AddContactModal from "./AddContactModal";

interface ContactListProps {
  initialContacts: ContactType[];
  userId: string;
}

export default function ContactList({ initialContacts, userId }: ContactListProps) {
  const [contacts, setContacts] = useState<ContactType[]>(initialContacts);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleUpdateContact = (updatedContact: ContactType) => {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const handleAddContact = (newContact: ContactType) => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onUpdate={handleUpdateContact}
            onDelete={handleDeleteContact}
          />
        ))}

        {/* Add New Contact Card */}
        <div
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-2 border-dashed border-gray-300 hover:border-blue-400 cursor-pointer group"
          onClick={() => setShowAddModal(true)}
        >
          <div className="flex flex-col items-center justify-center h-full min-h-50 text-center">
            <div className="mb-4 p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Add New Contact
            </h3>
            <p className="text-gray-600 text-sm">
              Create a new contact entry
            </p>
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      <AddContactModal
        userId={userId}
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddContact}
      />
    </>
  );
}