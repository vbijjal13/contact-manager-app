"use client";

import { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "./Icons";

type PopoverType = "success" | "error";

interface PopoverProps {
  type: PopoverType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number; // in milliseconds, default 2000
}

export default function Popover({ type, message, isVisible, onClose, duration = 2000 }: PopoverProps) {
  const [announced, setAnnounced] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Announce to screen readers when popover appears
      setAnnounced(false);
      setTimeout(() => setAnnounced(true), 100);

      // Auto-close after duration
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  const isSuccess = type === "success";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-25 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Popover */}
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className={`fixed top-4 right-4 z-50 max-w-sm w-full shadow-lg rounded-lg border ${
          isSuccess
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}
      >
        {/* Hidden announcement for screen readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {announced && `${isSuccess ? "Success" : "Error"}: ${message}`}
        </div>

        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {isSuccess ? (
                <CheckCircleIcon className="h-6 w-6 text-green-400" />
              ) : (
                <XCircleIcon className="h-6 w-6 text-red-400" />
              )}
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium">
                {isSuccess ? "Success" : "Error"}
              </p>
              <p className="mt-1 text-sm">
                {message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isSuccess
                    ? "text-green-500 hover:bg-green-100 focus:ring-green-600"
                    : "text-red-500 hover:bg-red-100 focus:ring-red-600"
                }`}
                onClick={onClose}
                aria-label="Close notification"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Hook for managing popover state
export function usePopover() {
  const [popover, setPopover] = useState<{
    type: PopoverType;
    message: string;
    isVisible: boolean;
  }>({
    type: "success",
    message: "",
    isVisible: false,
  });

  const showSuccess = (message: string) => {
    setPopover({
      type: "success",
      message,
      isVisible: true,
    });
  };

  const showError = (message: string) => {
    setPopover({
      type: "error",
      message,
      isVisible: true,
    });
  };

  const hidePopover = () => {
    setPopover(prev => ({ ...prev, isVisible: false }));
  };

  return {
    popover,
    showSuccess,
    showError,
    hidePopover,
  };
}
