import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';
import { sign } from 'hono/jwt';
import { StatusCode } from '../constants/enums';
import {
  signInSchema,
  signUpSchema,
  SignInSchema,
  SignUpSchema,
} from '@devrajm/zedium-common-app';
import { decryptPassword, encryptPassword } from '../libs';

export const signUpHandler = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const createPayload: SignUpSchema = await c.req.json();
    const { success } = signUpSchema.safeParse(createPayload);
    if (!success) {
      return c.json({ message: 'Invalid user input.' }, StatusCode.BADREQUEST);
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: createPayload.email },
          { username: createPayload.username },
        ],
      },
    });

    if (user) {
      return c.json(
        { message: 'Credentials already taken.' },
        StatusCode.CONFLICT
      );
    }

    const generatePasswordHash = await encryptPassword(
      c.env.SALT,
      createPayload.password
    );

    const newUser = await prisma.user.create({
      data: {
        email: createPayload.email,
        username: createPayload.username,
        firstName: createPayload.firstName,
        lastName: createPayload.lastName,
        password: generatePasswordHash,
      },
    });

    const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);

    return c.json(
      { token, message: 'Account created successfully.' },
      StatusCode.CREATED
    );
  } catch (error) {
    return c.json(
      { message: 'Internal server error.', error: error },
      StatusCode.INTERNALSERVERERROR
    );
  }
};

export const signInHandler = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const createPayload: SignInSchema = await c.req.json();
    const { success } = signInSchema.safeParse(createPayload);
    if (!success) {
      return c.json({ message: 'Invalid user input.' }, StatusCode.BADREQUEST);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: createPayload.email,
      },
    });

    if (!user) {
      return c.json(
        { message: 'Incorrect credentials.' },
        StatusCode.BADREQUEST
      );
    }

    const checkPassword = await decryptPassword(
      createPayload.password,
      user.password
    );

    if (!checkPassword) {
      return c.json(
        { message: 'Incorrect credentials.' },
        StatusCode.FORBIDDEN
      );
    }

    const { password, ...rest } = user;
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json(
      { token: token, user: rest, message: 'Signin successfully.' },
      StatusCode.SUCCESS
    );
  } catch (error) {
    return c.json(
      { message: 'Internal server error.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
};

export const userProfile = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get('userId');

  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return c.json({ message: 'Bad request.' }, StatusCode.BADREQUEST);
    }

    return c.json(user, StatusCode.SUCCESS);
  } catch (error) {
    return c.json(
      { message: 'Internal server error.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
};
