export const sanitizeUser = (user: any) => {
  const { password, ...rest } = user;
  return rest;
};
