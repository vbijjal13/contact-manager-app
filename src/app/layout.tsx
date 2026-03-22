import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "Contact Manager - Manage Your Contacts Easily",
  description: "Organize and manage all your contacts securely in one place. Easy-to-use contact manager with search, filter, and backup features.",
  keywords: "contact manager, organize contacts, contact organizer, contact storage, secure contacts",
  authors: [{ name: "Contact Manager Team" }],
  openGraph: {
    title: "Contact Manager - Manage Your Contacts Easily",
    description: "Keep all your important contacts organized and secure in one place.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Manager - Manage Your Contacts Easily",
    description: "Organize and manage all your contacts securely.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body>
        <div className="flex flex-col min-h-screen bg-slate-100">
          <Navbar />
        <main className="py-8 container mx-auto grow flex flex-col">
          {children}
        </main>
        </div>
      </body>
    </html>
  );
}
