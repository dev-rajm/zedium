import { createBlogSchema, updateBlogSchema } from '@devrajm/zedium-common-app';
import { StatusCode } from '../constants/StatusCodes';

export const validateCreateBlog = (input: unknown) => {
  const parsePayload = createBlogSchema.safeParse(input);
  if (!parsePayload.success) {
    throw {
      status: StatusCode.FORBIDDEN,
      message: 'Invalid blog format.',
      errors: parsePayload.error.flatten(),
    };
  }

  return parsePayload.data;
};

export const validateUpdateBlog = (input: unknown) => {
  const parsePayload = updateBlogSchema.safeParse(input);
  if (!parsePayload.success) {
    throw {
      status: StatusCode.BADREQUEST,
      message: 'Invalid blog format.',
      errors: parsePayload.error.flatten(),
    };
  }

  return parsePayload.data;
};
