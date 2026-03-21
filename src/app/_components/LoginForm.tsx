"use client";
import React, { useState } from "react";
import { isValidEmail } from "@/app/helpers/validator";
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
      const res = await fetch('/api/login', {
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
     <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            className="mt-1 block w-full bg-transparent border-b border-white/30 py-2 text-white placeholder:text-white/60 outline-none"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Password</span>
          <div className="relative mt-1">
            <input
              className="block w-full pr-10 bg-transparent border-b border-white/30 py-2 text-white placeholder:text-white/60 outline-none"
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
              className="absolute inset-y-0 right-0 pr-2 flex items-center text-white/70 hover:text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        </label>

        {errorMessage && <div className="text-red-400 text-sm">{errorMessage}</div>}
        {successMessage && <div className="text-green-400 text-sm">{successMessage}</div>}

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-white text-black rounded-md px-4 py-2 font-medium hover:opacity-95 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
  );
};

export default LoginForm;
