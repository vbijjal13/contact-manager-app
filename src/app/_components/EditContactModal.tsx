"use client";

import { useState } from "react";
import { ContactType, CreateContactType } from "../_types/types";
import { updateContact } from "../_lib/contactService";

interface EditContactModalProps {
  contact: ContactType;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedContact: ContactType) => void;
}

export default function EditContactModal({ contact, isOpen, onClose, onUpdate }: EditContactModalProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CreateContactType>({
    userId: contact.userId,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phoneNumber: contact.phoneNumber,
    countryCode: contact.countryCode,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedContact = await updateContact(contact.id, form);
      onUpdate(updatedContact);
      onClose();
    } catch (error) {
      console.error("Failed to update contact:", error);
      alert("Failed to update contact. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Contact</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-semibold text-gray-700">First Name</span>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInputChange}
                  className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-gray-700">Last Name</span>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleInputChange}
                  className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </label>

            <div className="grid grid-cols-3 gap-4">
              <label className="block">
                <span className="text-sm font-semibold text-gray-700">Country Code</span>
                <input
                  type="text"
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleInputChange}
                  className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1"
                  required
                />
              </label>
              <label className="block col-span-2">
                <span className="text-sm font-semibold text-gray-700">Phone Number</span>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
