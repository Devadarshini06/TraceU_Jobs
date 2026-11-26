// ==============================|| FORM VALIDATION HELPERS ||============================== //

/**
 * Validates a person's name ensuring it exists and contains at least minLetters letters.
 */
export function validateName(name, fieldLabel = 'Full Name', minLetters = 5) {
  if (!name || !name.trim()) {
    return `${fieldLabel} is missing. Please enter your name.`;
  }
  const lettersOnly = name.trim().replace(/[^a-zA-Z]/g, '');
  if (lettersOnly.length < minLetters) {
    return `${fieldLabel} must contain at least ${minLetters} letters (currently ${lettersOnly.length}/${minLetters}).`;
  }
  return '';
}

/**
 * Validates an email address ensuring presence of '@', '.', and valid domain like '.com' or '.in'.
 */
export function validateEmail(email, fieldLabel = 'Email address') {
  if (!email || !email.trim()) {
    return `${fieldLabel} is missing. Please enter your email.`;
  }
  const trimmed = email.trim();
  if (!trimmed.includes('@')) {
    return `${fieldLabel} is missing '@' symbol (e.g. name@domain.com).`;
  }
  const parts = trimmed.split('@');
  if (parts.length !== 2 || !parts[1] || !parts[0]) {
    return `${fieldLabel} format is invalid. Please check username and domain.`;
  }
  const domainPart = parts[1];
  if (!domainPart.includes('.')) {
    return `${fieldLabel} is missing domain extension like .com or .in.`;
  }
  // Check that domain ends with .com, .in, or standard top-level domain
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in|org|net|co|io|edu|gov|[a-zA-Z]{2,})$/i;
  if (!emailRegex.test(trimmed)) {
    return `${fieldLabel} must end with a valid domain such as .com or .in (e.g. user@company.com).`;
  }
  return '';
}

/**
 * Validates a password with a minimum length requirement.
 */
export function validatePassword(password, fieldLabel = 'Password', minLength = 6) {
  if (!password || !password.trim()) {
    return `${fieldLabel} is missing. Please enter your password.`;
  }
  if (password.length < minLength) {
    return `${fieldLabel} must be at least ${minLength} characters (currently ${password.length}/${minLength}).`;
  }
  return '';
}

/**
 * Validates mobile number to ensure at least 10 digits.
 */
export function validateMobile(mobile, fieldLabel = 'Mobile number') {
  if (!mobile || !mobile.trim()) {
    return `${fieldLabel} is missing. Please enter your 10-digit mobile number.`;
  }
  const digitsOnly = mobile.replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    return `${fieldLabel} must have at least 10 digits (currently ${digitsOnly.length}/10).`;
  }
  return '';
}

/**
 * Validates a required text field.
 */
export function validateRequired(value, fieldLabel = 'This field', minChars = 1) {
  if (!value || !String(value).trim()) {
    return `${fieldLabel} is missing.`;
  }
  if (String(value).trim().length < minChars) {
    return `${fieldLabel} must be at least ${minChars} characters.`;
  }
  return '';
}

