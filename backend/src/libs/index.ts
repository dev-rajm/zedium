import { compare, genSalt, hash } from 'bcryptjs';
import { Context } from 'hono';

export const encryptPassword = async (c: Context, password: string) => {
  const salt = await genSalt(c.env.SALT);
  return await hash(password, salt);
};

export const decryptPassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};
