import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'hono/jwt';

export const encryptPassword = async (salt: number, password: string) => {
  const saltNum = await genSalt(salt);
  return await hash(password, saltNum);
};

export const decryptPassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};

export const generateToken = async (userId: string, secret: string) => {
  return sign(
    { id: userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
    secret
  );
};
