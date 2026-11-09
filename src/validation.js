export const REG_NO_REGEX = /^[A-Z]{2,4}\/\d{3,5}\/\d{2,4}$/i;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(regNo, password) {
  const errors = {};
  if (!regNo.trim()) errors.regNo = 'Registration number is required';
  else if (!REG_NO_REGEX.test(regNo.trim()))
    errors.regNo = 'Format must look like CS/12345/2023';

  if (!password) errors.password = 'Password cannot be empty';
  else if (password.length < 6)
    errors.password = 'Password must be at least 6 characters';
  return errors;
}