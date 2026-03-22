"use client";

import { useState } from "react";
import { ContactType } from "../_types/types";
import { deleteContact, formatFullName, formatPhone } from "../_lib/contactService";
import { EditIcon, CopyIcon, DeleteIcon } from "./Icons";
import EditContactModal from "./EditContactModal";
import CopyContactModal from "./CopyContactModal";
import ConfirmModal from "./ConfirmModal";
import Popover, { usePopover } from "./Popover";

interface ContactCardProps {
  contact: ContactType;
  onUpdate: (updatedContact: ContactType) => void;
  onDelete: (contactId: string) => void;
}

export default function ContactCard({ contact, onUpdate, onDelete }: ContactCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { popover, showError, hidePopover } = usePopover();

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await deleteContact(contact.id);
      setShowDeleteConfirm(false);
      onDelete(contact.id);
    } catch (error) {
      console.error("Failed to delete contact:", error);
      showError("Failed to delete contact. Please try again.");
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition relative">
        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setShowEditModal(true)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
            title="Edit contact"
          >
            <EditIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowCopyModal(true)}
            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition"
            title="Copy contact details"
          >
            <CopyIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition"
            title="Delete contact"
          >
            <DeleteIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Contact details */}
        <div className="pr-20">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {formatFullName(contact.firstName, contact.lastName)}
          </h3>
          <div className="space-y-1 text-gray-600">
            <p className="flex items-center">
              <span className="font-medium mr-2">Email:</span>
              {contact.email}
            </p>
            <p className="flex items-center">
              <span className="font-medium mr-2">Phone:</span>
              {formatPhone(contact.countryCode, contact.phoneNumber)}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditContactModal
        contact={contact}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdate={onUpdate}
      />

      {/* Copy Modal */}
      <CopyContactModal
        contact={contact}
        isOpen={showCopyModal}
        onClose={() => setShowCopyModal(false)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Contact"
        message={`Are you sure you want to delete ${formatFullName(contact.firstName, contact.lastName)}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      <Popover
        type={popover.type}
        message={popover.message}
        isVisible={popover.isVisible}
        onClose={hidePopover}
      />
    </>
  );
}
