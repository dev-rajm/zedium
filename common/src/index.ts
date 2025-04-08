import { z } from 'zod';

export const signUpSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.string().optional(),
  published: z.boolean(),
});

export const updateBlogSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  tags: z.string().optional(),
  published: z.boolean().optional(),
  id: z.string(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;
