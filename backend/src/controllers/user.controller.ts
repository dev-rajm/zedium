import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';
import { sign } from 'hono/jwt';

enum StatusCode {
  INTERNALSERVERERROR = 500,
  BADREQUEST = 400,
  NOTFOUND = 404,
  FORBIDDEN = 403,
  OK = 200,
}

type userSignupType = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

export const signUpHandler = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const createPayload: userSignupType = await c.req.json();
    const user = await prisma.user.findFirst({
      where: {
        email: createPayload.email,
      },
    });

    if (user) {
      return c.json({
        message: 'Email already exist. Login or try again with another email',
      });
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
    return c.json({ token }, StatusCode.OK);
  } catch (error) {
    return c.json(
      { message: 'Error while signing up. Please try again later.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
};

export const signInHandler = async (c: Context) => {
  c.text('signin controller');
};
