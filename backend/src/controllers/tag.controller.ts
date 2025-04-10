import { Context } from 'hono';
import { StatusCode } from '../constants/enums';
import { getConn } from '../libs/db';
import handleError from '../utils/errorHandler';
import { fetchAllBlogsByTagName, fetchAllTags } from '../services/tag.service';

export const getAllTags = async (c: Context) => {
  const prisma = getConn(c.env.DATABASE_URL);

  try {
    const result = await fetchAllTags(prisma);
    return c.json(result, StatusCode.SUCCESS);
  } catch (error) {
    return handleError(c, error);
  }
};

export const getPostsByTag = async (c: Context) => {
  const prisma = getConn(c.env.DATABASE_URL);
  const tagName = c.req.param('tag');

  try {
    const result = await fetchAllBlogsByTagName(prisma, tagName);
    return c.json(result, StatusCode.SUCCESS);
  } catch (error) {
    return handleError(c, error);
  }
};
