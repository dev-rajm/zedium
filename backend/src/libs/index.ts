import { compare, genSalt, hash } from 'bcryptjs';
import { Context } from 'hono';

export const encryptPassword = async (salt: number, password: string) => {
  const saltNum = await genSalt(salt);
  return await hash(password, saltNum);
};

export const decryptPassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};
