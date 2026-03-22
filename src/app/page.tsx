import Link from "next/link";
import FAQSection from "./_components/FAQSection";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 px-4 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Manage Your Contacts Easily
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Keep all your important contacts organized in one secure place. 
            Never lose touch with the people who matter most to you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/register"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Illustration */}
      <section className="py-12 px-4 bg-linear-to-b from-blue-50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <svg
            viewBox="0 0 400 300"
            className="w-full h-auto max-w-2xl mx-auto"
            aria-label="Contact management illustration"
          >
            {/* Phone device */}
            <rect x="150" y="40" width="100" height="220" rx="10" fill="white" stroke="#333" strokeWidth="2" />
            <rect x="155" y="45" width="90" height="180" rx="5" fill="#f0f9ff" />
            {/* Contact cards in phone */}
            <rect x="165" y="60" width="70" height="40" rx="3" fill="#dbeafe" />
            <circle cx="175" cy="75" r="5" fill="#3b82f6" />
            <line x1="183" y1="70" x2="225" y2="70" stroke="#666" strokeWidth="1" />
            <line x1="183" y1="77" x2="225" y2="77" stroke="#999" strokeWidth="1" />
            
            <rect x="165" y="110" width="70" height="40" rx="3" fill="#dbeafe" />
            <circle cx="175" cy="125" r="5" fill="#3b82f6" />
            <line x1="183" y1="120" x2="225" y2="120" stroke="#666" strokeWidth="1" />
            <line x1="183" y1="127" x2="225" y2="127" stroke="#999" strokeWidth="1" />
            
            <rect x="165" y="160" width="70" height="40" rx="3" fill="#dbeafe" />
            <circle cx="175" cy="175" r="5" fill="#3b82f6" />
            <line x1="183" y1="170" x2="225" y2="170" stroke="#666" strokeWidth="1" />
            <line x1="183" y1="177" x2="225" y2="177" stroke="#999" strokeWidth="1" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Our Contact Manager?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-lg bg-white shadow-md hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  className="text-blue-600"
                  fill="currentColor"
                  aria-label="Security icon"
                >
                  <path d="M28 2L8 12v12c0 14 20 24 20 24s20-10 20-24V12L28 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your contacts are encrypted and stored securely. Only you have access to your personal information.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-lg bg-white shadow-md hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  className="text-green-600"
                  fill="currentColor"
                  aria-label="Organization icon"
                >
                  <path d="M8 12h40v4H8zm0 10h40v4H8zm0 10h40v4H8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Organized & Searchable
              </h3>
              <p className="text-gray-600">
                Sort, filter, and search through your contacts instantly. Find exactly who you need in seconds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-lg bg-white shadow-md hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  className="text-purple-600"
                  fill="currentColor"
                  aria-label="Synchronization icon"
                >
                  <path d="M28 4C15.3 4 5 14.3 5 27c0 12.7 10.3 23 23 23s23-10.3 23-23h-4c0 10.5-8.5 19-19 19S9 39.5 9 29s8.5-19 19-19v5l8-8-8-8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Easy to Use
              </h3>
              <p className="text-gray-600">
                Simple, intuitive interface that anyone can use. Add, edit, and manage contacts in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-linear-to-r from-blue-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Key Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <div>
                <h3 className="font-bold mb-2">Save Time</h3>
                <p>Stop wasting time searching through phone contacts. Everything is right here.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <div>
                <h3 className="font-bold mb-2">Never Lose Contact</h3>
                <p>Backup all your contact information safely in the cloud.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <div>
                <h3 className="font-bold mb-2">Add Rich Details</h3>
                <p>Store email, phone, address, notes, and more for each contact.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <div>
                <h3 className="font-bold mb-2">Quick Access</h3>
                <p>Access your contacts anywhere, anytime from any device.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Organize Your Contacts?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands of users who trust us to keep their contacts safe and organized.
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create Your Free Account Today
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
