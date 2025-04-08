import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';
import { sign } from 'hono/jwt';
import { StatusCode } from '../constants/enums';

export const signUpHandler = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const createPayload = await c.req.json();
    const user = await prisma.user.findFirst({
      where: {
        email: createPayload.email,
      },
    });

    if (user) {
      return c.json(
        {
          message: 'Email already exist. Login or try again with another email',
        },
        StatusCode.CONFLICT
      );
    }

    const newUser = await prisma.user.create({
      data: {
        email: createPayload.email,
        username: createPayload.username,
        firstName: createPayload.firstName,
        lastName: createPayload.lastName,
        password: createPayload.password,
      },
    });

    const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);
    return c.json({ token }, StatusCode.CREATED);
  } catch (error) {
    return c.json(
      { message: 'Internal server error. Please try again later.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
};

export const signInHandler = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const createPayload = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: createPayload.email,
        password: createPayload.password,
      },
    });

    if (!user) {
      return c.json(
        { message: 'User not found. Signup or try again with another email.' },
        StatusCode.BADREQUEST
      );
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token }, StatusCode.SUCCESS);
  } catch (error) {
    return c.json(
      { message: 'Internal server error. Please try again later.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
};

export const userProfile = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { id } = c.get('userId');

  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      return c.json({ message: 'Bad request.' }, StatusCode.BADREQUEST);
    }

    return c.json(user, StatusCode.SUCCESS);
  } catch (error) {
    return c.json(
      { message: 'Internal server error. Please try again later.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
};
