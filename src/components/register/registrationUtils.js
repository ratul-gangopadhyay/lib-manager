export const alreadyPresent = (email, users) => {
  const user = users.find((user) => user.email === email);
  return Boolean(user);
};
