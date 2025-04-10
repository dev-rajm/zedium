import { Context } from 'hono';
import { StatusCode } from '../constants/enums';
import { getConn } from '../libs/db';
import handleError from '../utils/errorHandler';
import {
  createNewBlog,
  deleteExistingBlogById,
  fetchAllBlogs,
  fetchBlogsByBlogId,
  fetchBlogsByUserId,
  updateExistingBlogById,
} from '../services/blog.service';

export const getAllBlogs = async (c: Context) => {
  const prisma = getConn(c.env.DATABASE_URL);

  try {
    const result = await fetchAllBlogs(prisma);
    return c.json(result, StatusCode.SUCCESS);
  } catch (error) {
    return handleError(c, error);
  }
};

export const getBlogsByUser = async (c: Context) => {
  const prisma = getConn(c.env.DATABASE_URL);
  const userId: string = c.get('userId');

  try {
    const result = await fetchBlogsByUserId(prisma, userId);
    return c.json(result, StatusCode.SUCCESS);
  } catch (error) {
    return handleError(c, error);
  }
};

export const getBlogById = async (c: Context) => {
  const prisma = getConn(c.env.DATABASE_URL);
  const blogId = c.req.param('id');

  try {
    const result = await fetchBlogsByBlogId(prisma, blogId);
    return c.json(result, StatusCode.SUCCESS);
  } catch (error) {
    return handleError(c, error);
  }
};

export const createBlog = async (c: Context) => {
  const prisma = getConn(c.env.DATABASE_URL);
  const userId: string = c.get('userId');

  try {
    const payload = await c.req.json();
    const result = await createNewBlog(prisma, payload, userId);

    return c.json(result, StatusCode.CREATED);
  } catch (error) {
    return handleError(c, error);
  }
};

export const updateBlogById = async (c: Context) => {
  const prisma = getConn(c.env.DATABASE_URL);
  const blogId = c.req.param('id');
  const userId: string = c.get('userId');

  try {
    const payload = await c.req.json();
    const result = await updateExistingBlogById(
      prisma,
      payload,
      blogId,
      userId
    );

    return c.json(result, StatusCode.SUCCESS);
  } catch (error) {
    return handleError(c, error);
  }
};

export const deleteBlogById = async (c: Context) => {
  const prisma = getConn(c.env.DATABASE_URL);
  const blogId = c.req.param('id');
  const userId: string = c.get('userId');

  try {
    const result = await deleteExistingBlogById(prisma, blogId, userId);
    return c.json(result, StatusCode.SUCCESS);
  } catch (error) {
    return handleError(c, error);
  }
};
