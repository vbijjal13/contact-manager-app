"use client";

import { useState } from "react";
import { ContactType, CreateContactType } from "../_types/types";
import { addContact } from "../_lib/contactService";
import { CloseIcon } from "./Icons";
import Popover, { usePopover } from "./Popover";

interface AddContactModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newContact: ContactType) => void;
}

export default function AddContactModal({ userId, isOpen, onClose, onAdd }: AddContactModalProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CreateContactType>({
    userId,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    countryCode: "+1",
  });
  const { popover, showError, hidePopover } = usePopover();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phoneNumber.trim()) {
      showError("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showError("Please enter a valid email address.");
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(form.phoneNumber.replace(/\D/g, ""))) {
      showError("Please enter a valid phone number (10-15 digits).");
      return;
    }

    setLoading(true);
    try {
      const newContact = await addContact(form);
      onAdd(newContact);
      onClose();
      // Reset form
      setForm({
        userId,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        countryCode: "+1",
      });
    } catch (error) {
      console.error("Failed to add contact:", error);
      showError("Failed to add contact. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Add New Contact</h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Code
                </label>
                <input
                  type="text"
                  id="countryCode"
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1"
                  disabled={loading}
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1234567890"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Contact"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Popover
        type={popover.type}
        message={popover.message}
        isVisible={popover.isVisible}
        onClose={hidePopover}
      />
    </>
  );
}