// Shared validators for the app (TypeScript)
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(String(email).trim());
}

export function isValidPassword(password: string): boolean {
  if (!password || typeof password !== "string") return false;
  const pw = password.trim();
  if (pw.length < 8) return false;
  const hasLetter = /[A-Za-z]/.test(pw);
  const hasDigit = /\d/.test(pw);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw);
  return hasLetter && hasDigit && hasSpecial;
}

export default { isValidEmail, isValidPassword };
