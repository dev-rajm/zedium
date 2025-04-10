import {
  signInSchema,
  SignInSchema,
  signUpSchema,
  SignUpSchema,
} from '@devrajm/zedium-common-app';
import { StatusCode } from '../constants/enums';

export const validateSignUp = (input: unknown): SignUpSchema => {
  const parsePayload = signUpSchema.safeParse(input);
  if (!parsePayload.success) {
    throw {
      status: StatusCode.BADREQUEST,
      message: 'Invalid user input.',
      errors: parsePayload.error.flatten(),
    };
  }

  return parsePayload.data;
};

export const validateSignIn = (input: unknown): SignInSchema => {
  const parsePayload = signInSchema.safeParse(input);
  if (!parsePayload.success) {
    throw {
      status: StatusCode.BADREQUEST,
      message: 'Invalid user input.',
      errors: parsePayload.error.flatten(),
    };
  }

  return parsePayload.data;
};
