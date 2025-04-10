import { SignInSchema, SignUpSchema } from '@devrajm/zedium-common-app';
import { StatusCode } from '../constants/enums';
import { GetConnType } from '../libs/db';
import { validateSignIn, validateSignUp } from '../validaters/validate.user';
import { decryptPassword, encryptPassword, generateToken } from '../libs/auth';
import { sanitizeUser } from '../utils/sanitizeUser';

export const registerUser = async (
  prisma: GetConnType,
  payload: SignUpSchema,
  env: { SALT: number; JWT_SECRET: string }
) => {
  const data = validateSignUp(payload);

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: data.email }, { username: data.username }],
    },
  });

  if (existingUser) {
    throw {
      status: StatusCode.CONFLICT,
      message: 'Credentials already taken.',
    };
  }

  const hashed = await encryptPassword(env.SALT, data.password);

  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      password: hashed,
    },
  });

  const token = await generateToken(newUser.id, env.JWT_SECRET);

  return {
    status: StatusCode.CREATED,
    message: 'Account created.',
    token,
  };
};

export const loginUser = async (
  prisma: GetConnType,
  payload: SignInSchema,
  env: { JWT_SECRET: string }
) => {
  const data = validateSignIn(payload);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!existingUser) {
    throw {
      status: StatusCode.NOTFOUND,
      message: 'Incorrect credentials.',
    };
  }

  const checkPassword = await decryptPassword(
    data.password,
    existingUser.password
  );

  if (!checkPassword) {
    throw {
      status: StatusCode.FORBIDDEN,
      message: 'Incorrect credentials.',
    };
  }

  const userSanitizedData = sanitizeUser(existingUser);
  const token = await generateToken(userSanitizedData.id, env.JWT_SECRET);

  return {
    status: StatusCode.SUCCESS,
    user: userSanitizedData,
    message: 'Signin successfully.',
    token,
  };
};

export const fetchUserProfile = async (prisma: GetConnType, userId: string) => {
  const existingUser = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!existingUser) {
    throw {
      message: 'Unauthorized.',
      status: StatusCode.UNAUTHORIZED,
    };
  }

  return {
    existingUser,
    status: StatusCode.SUCCESS,
  };
};
