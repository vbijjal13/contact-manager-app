"use client";

import React, { useState } from "react";
import { isValidEmail } from "../_helpers/validator";
import { EyeIcon, EyeOffIcon } from "../_components/Icons";

type LoginForm = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate email format before proceeding
    if (!isValidEmail(form.email)) {
      // don't proceed with invalid email
      console.error("Invalid email format:", form.email);
      return;
    }

    // On submit, console the current form data
    console.log("Login submit:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black text-white rounded-lg shadow-2xl p-8">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>

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

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-white text-black rounded-md px-4 py-2 font-medium hover:opacity-95 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;