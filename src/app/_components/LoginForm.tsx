"use client";
import React, { useState } from "react";
import { isValidEmail } from "@/app/_lib/validator";
import { EyeIcon, EyeOffIcon } from "./Icons";
import { useRouter } from "next/navigation";

type LoginFormType = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<LoginFormType>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // reset messages and start loader
    setErrorMessage(null);
    setSuccessMessage(null);
    if (!isValidEmail(form.email)) {
      setErrorMessage("Invalid email format");
      return;
    }

    setLoading(true);
    try {
      const LOGIN_URL = process.env.LOGIN_URL || '/api/login';
      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (res.ok) {
        const userName = data?.user?.name || 'User';
        setSuccessMessage(`Welcome ${userName}`);
        setTimeout(() => {
          setLoading(false);
          router.push('/contact');
          router.refresh();
        }, 1500);
      } else {
        const error = data?.error || 'Login failed with unknown error.';
        setErrorMessage(error);
        setLoading(false);
      }
    } catch (err) {
      console.error("Login error", err);
      setErrorMessage("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
     <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-gray-700">Email</span>
          <input
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-gray-700">Password</span>
          <div className="relative mt-2">
            <input
              className="block w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        </label>

        {errorMessage && <div className="px-4 py-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium">{errorMessage}</div>}
        {successMessage && <div className="px-4 py-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium">{successMessage}</div>}

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>
  );
};

export default LoginForm;
