"use client";
import React, { useState } from "react";
import { isValidEmail, isValidPassword } from "@/app/_lib/validator";
import { EyeIcon, EyeOffIcon } from "./Icons";
import { useRouter } from "next/navigation";

type RegisterFormType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm: React.FC = () => {
  const [form, setForm] = useState<RegisterFormType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RegisterFormType, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setFieldErrors((errs) => ({ ...errs, [name as keyof RegisterFormType]: undefined }));

    if (name === "email") {
      setFieldErrors((errs) => ({ ...errs, email: isValidEmail(value) ? undefined : "Please enter a valid email address." }));
    }
    if (name === "password") {
      setFieldErrors((errs) => ({ ...errs, confirmPassword: form.confirmPassword && value === form.confirmPassword ? undefined : errs.confirmPassword }));
    }
    if (name === "confirmPassword") {
      setFieldErrors((errs) => ({ ...errs, confirmPassword: value === form.password ? undefined : "Passwords do not match." }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // reset messages and start loader
    setErrorMessage(null);
    setSuccessMessage(null);

    const errors: Partial<Record<keyof RegisterFormType, string>> = {};

    if (!isValidEmail(form.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!isValidPassword(form.password)) {
      errors.password =
        "Password must be at least 8 characters and include at least one letter, one number and one special character.";
    }

    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (!form.firstName.trim()) errors.firstName = "First name is required.";
    if (!form.lastName.trim()) errors.lastName = "Last name is required.";

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.error("Validation errors:", errors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const userName = data?.user?.name || 'User';
        setSuccessMessage(`Welcome ${userName}! Registration successful.`);
        setTimeout(() => {
          setLoading(false);
          router.push('/contact');
          router.refresh();
        }, 1500);
      } else {
        const error = data?.error || 'Registration failed with unknown error.';
        setErrorMessage(error);
        setLoading(false);
      }
    } catch (err) {
      console.error("Registration error", err);
      setErrorMessage("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-gray-700">First name</span>
          <input
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="John"
            required
          />
          {fieldErrors.firstName && <p className="mt-2 text-sm text-red-600">{fieldErrors.firstName}</p>}
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-gray-700">Last name</span>
          <input
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
          />
          {fieldErrors.lastName && <p className="mt-2 text-sm text-red-600">{fieldErrors.lastName}</p>}
        </label>

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
          {fieldErrors.email && <p className="mt-2 text-sm text-red-600">{fieldErrors.email}</p>}
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
          {fieldErrors.password && <p className="mt-2 text-sm text-red-600">{fieldErrors.password}</p>}

          <ul className="mt-3 space-y-2 text-sm">
            {(() => {
              const pw = form.password || "";
              const checks = {
                length: pw.trim().length >= 8,
                letter: /[A-Za-z]/.test(pw),
                number: /\d/.test(pw),
                special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw),
              };
              return (
                <>
                  <li className={checks.length ? "text-green-600" : "text-gray-500"}>
                    <span className="font-semibold">{checks.length ? "✓" : "○"}</span> Minimum 8 characters
                  </li>
                  <li className={checks.letter ? "text-green-600" : "text-gray-500"}>
                    <span className="font-semibold">{checks.letter ? "✓" : "○"}</span> At least one letter
                  </li>
                  <li className={checks.number ? "text-green-600" : "text-gray-500"}>
                    <span className="font-semibold">{checks.number ? "✓" : "○"}</span> At least one number
                  </li>
                  <li className={checks.special ? "text-green-600" : "text-gray-500"}>
                    <span className="font-semibold">{checks.special ? "✓" : "○"}</span> At least one special character
                  </li>
                </>
              );
            })()}
          </ul>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-gray-700">Confirm Password</span>
          <div className="relative mt-2">
            <input
              className="block w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              aria-label="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((s) => !s)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          {fieldErrors.confirmPassword && <p className="mt-2 text-sm text-red-600">{fieldErrors.confirmPassword}</p>}
        </label>

        {errorMessage && <div className="px-4 py-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium">{errorMessage}</div>}
        {successMessage && <div className="px-4 py-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium">{successMessage}</div>}

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      </form>
  );
};

export default RegisterForm;
