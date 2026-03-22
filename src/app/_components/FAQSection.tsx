"use client";

import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQData: FAQItem[] = [
  {
    id: "security",
    question: "Is my data secure?",
    answer:
      "Yes! All your contact data is encrypted using industry-standard security protocols. We never share your information with third parties.",
  },
  {
    id: "export",
    question: "Can I export my contacts?",
    answer:
      "Yes, you can export your contacts in various formats for backup or migration purposes.",
  },
  {
    id: "delete",
    question: "How do I delete a contact?",
    answer:
      "Simply navigate to any contact and click the delete button. You can also bulk delete multiple contacts.",
  },
  {
    id: "mobile",
    question: "Is there a mobile app?",
    answer:
      "Our web app is fully responsive and works perfectly on mobile devices. Access it anytime, anywhere.",
  },
];

export default function FAQSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {FAQData.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
            >
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full px-6 py-6 text-left font-bold text-gray-900 bg-white hover:bg-gray-50 transition flex justify-between items-center"
                aria-expanded={expandedId === item.id}
              >
                <span>{item.question}</span>
                <span
                  className={`ml-4 text-blue-600 font-bold transition-transform ${
                    expandedId === item.id ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {expandedId === item.id && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
