import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "Contact Manager",
  description: "Manage your contacts efficiently",
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
