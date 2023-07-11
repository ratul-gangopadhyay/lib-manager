export const validateEmail = (email) => {
  const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexPattern.test(email);
};
