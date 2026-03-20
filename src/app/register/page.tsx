"use client";

import React, { useState } from "react";
import { isValidEmail, isValidPassword } from "../_helpers/validator";

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RegisterForm, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setFieldErrors((errs) => ({ ...errs, [name as keyof RegisterForm]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Partial<Record<keyof RegisterForm, string>> = {};

    // email validation
    if (!isValidEmail(form.email)) {
      errors.email = "Please enter a valid email address.";
    }

    // password validation
    if (!isValidPassword(form.password)) {
      errors.password =
        "Password must be at least 8 characters and include at least one letter, one number and one special character.";
    }

    // confirm password match
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    // simple required checks
    if (!form.firstName.trim()) errors.firstName = "First name is required.";
    if (!form.lastName.trim()) errors.lastName = "Last name is required.";

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.error("Validation errors:", errors);
      return;
    }

    // success - strip confirmPassword when logging
    const { confirmPassword, ...toSubmit } = form;
    console.log("Register submit:", toSubmit);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black text-white rounded-lg shadow-2xl p-8">
        <h1 className="text-2xl font-semibold mb-6">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">First name</span>
            <input
              className="mt-1 block w-full bg-transparent border-b border-white/30 py-2 text-white placeholder:text-white/60 outline-none"
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              required
            />
            {fieldErrors.firstName && (
              <p className="mt-1 text-sm text-red-400">{fieldErrors.firstName}</p>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium">Last name</span>
            <input
              className="mt-1 block w-full bg-transparent border-b border-white/30 py-2 text-white placeholder:text-white/60 outline-none"
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              required
            />
            {fieldErrors.lastName && (
              <p className="mt-1 text-sm text-red-400">{fieldErrors.lastName}</p>
            )}
          </label>

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
            {fieldErrors.email && <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>}
          </label>

          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <input
              className="mt-1 block w-full bg-transparent border-b border-white/30 py-2 text-white placeholder:text-white/60 outline-none"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-400">{fieldErrors.password}</p>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium">Confirm password</span>
            <input
              className="mt-1 block w-full bg-transparent border-b border-white/30 py-2 text-white placeholder:text-white/60 outline-none"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            {fieldErrors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">{fieldErrors.confirmPassword}</p>
            )}
          </label>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-white text-black rounded-md px-4 py-2 font-medium hover:opacity-95 transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
