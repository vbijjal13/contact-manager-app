"use client";

import { useState } from "react";
import { ContactType } from "../_types/types";
import { formatFullName, formatPhone } from "../_lib/contactService";
import { CloseIcon } from "./Icons";

interface CopyContactModalProps {
  contact: ContactType;
  isOpen: boolean;
  onClose: () => void;
}

export default function CopyContactModal({ contact, isOpen, onClose }: CopyContactModalProps) {
  const [copySelections, setCopySelections] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const [copyMessage, setCopyMessage] = useState("");

  const handleCopySelectionChange = (field: keyof typeof copySelections) => {
    setCopySelections(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleCopy = async () => {
    const selectedData: string[] = [];

    if (copySelections.name) {
      selectedData.push(formatFullName(contact.firstName, contact.lastName));
    }
    if (copySelections.email) {
      selectedData.push(contact.email);
    }
    if (copySelections.phone) {
      selectedData.push(formatPhone(contact.countryCode, contact.phoneNumber));
    }

    if (selectedData.length === 0) {
      alert("Please select at least one field to copy.");
      return;
    }

    const textToCopy = selectedData.join("\n");
    await navigator.clipboard.writeText(textToCopy);

    setCopyMessage("Details copied to clipboard!");
    setTimeout(() => {
      onClose();
      setCopyMessage("");
      setCopySelections({ name: false, email: false, phone: false });
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Copy Contact Details</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {copyMessage && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-center font-medium">
              {copyMessage}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={copySelections.name}
                onChange={() => handleCopySelectionChange('name')}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">
                <span className="font-medium">Name:</span> {formatFullName(contact.firstName, contact.lastName)}
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={copySelections.email}
                onChange={() => handleCopySelectionChange('email')}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">
                <span className="font-medium">Email:</span> {contact.email}
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={copySelections.phone}
                onChange={() => handleCopySelectionChange('phone')}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">
                <span className="font-medium">Phone:</span> {formatPhone(contact.countryCode, contact.phoneNumber)}
              </span>
            </label>
          </div>

          <button
            onClick={handleCopy}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
          >
            Copy Selected Details
          </button>
        </div>
      </div>
    </div>
  );
}
