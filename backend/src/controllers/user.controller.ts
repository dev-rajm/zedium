import { Context } from 'hono';
import { StatusCode } from '../constants/enums';
import { SignInSchema, SignUpSchema } from '@devrajm/zedium-common-app';
import { getConn } from '../libs/db';
import handleError from '../utils/errorHandler';
import {
  fetchUserProfile,
  loginUser,
  registerUser,
} from '../services/user.service';

export const signUpHandler = async (c: Context) => {
  const prisma = getConn(c.env.DATABASE_URL);

  try {
    const payload: SignUpSchema = await c.req.json();
    const result = await registerUser(prisma, payload, {
      SALT: c.env.SALT,
      JWT_SECRET: c.env.JWT_SECRET,
    });

    return c.json(result, StatusCode.CREATED);
  } catch (error) {
    return handleError(c, error);
  }
};

export const signInHandler = async (c: Context) => {
  const prisma = getConn(c.env.DATABASE_URL);

  try {
    const payload: SignInSchema = await c.req.json();
    const result = await loginUser(prisma, payload, {
      JWT_SECRET: c.env.JWT_SECRET,
    });

    return c.json(result, StatusCode.SUCCESS);
  } catch (error) {
    return handleError(c, error);
  }
};

export const userProfile = async (c: Context) => {
  const prisma = getConn(c.env.DATABASE_URL);
  const userId = c.get('userId');

  try {
    const result = await fetchUserProfile(prisma, userId);
    return c.json(result, StatusCode.SUCCESS);
  } catch (error) {
    return handleError(c, error);
  }
};
