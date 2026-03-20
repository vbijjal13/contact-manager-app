// Shared validators for the app
/**
 * Check if a string is a valid email address.
 * Kept intentionally simple but practical for client-side validation.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(String(email).trim());
}


/**
 * Check if a password meets requirements:
 * - minimum 8 characters
 * - at least one letter
 * - at least one digit
 * - at least one special character
 * @param {string} password
 * @returns {boolean}
 */
export function isValidPassword(password) {
  if (!password || typeof password !== "string") return false;
  const pw = password.trim();
  if (pw.length < 8) return false;
  const hasLetter = /[A-Za-z]/.test(pw);
  const hasDigit = /\d/.test(pw);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw);
  return hasLetter && hasDigit && hasSpecial;
}

// also include in default export
// include isValidPassword in default export
export default { isValidEmail, isValidPassword };
