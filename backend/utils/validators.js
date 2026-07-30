// Simple email pattern — good enough for signup/login gating.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email) =>
  typeof email === "string" && EMAIL_REGEX.test(email.trim());

// Returns an error message string, or null if the signup input is valid.
export const validateSignUp = ({ firstName, lastName, userName, email, password }) => {
  if (!firstName || !lastName || !userName || !email || !password) {
    return "send all details";
  }
  if (String(userName).trim().length < 3) {
    return "username must be at least 3 characters";
  }
  if (!isValidEmail(email)) {
    return "please provide a valid email";
  }
  if (String(password).length < 6) {
    return "password must be at least 6 characters";
  }
  return null;
};
