import { Context } from 'hono';
import { StatusCode } from '../constants/enums';
import getConn from '../libs/db';

export const getAllTags = async (c: Context) => {
  const prisma = getConn(c.env.DATABASE_URL);

  try {
    const tags = await prisma.tag.findMany();
    if (tags.length == 0) {
      return c.json({ message: 'No tags created yet.' }, StatusCode.SUCCESS);
    }

    return c.json(tags);
  } catch (error) {
    return c.json(
      { message: 'Internal server error. Please try again later.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
};

export const getPostsByTag = async (c: Context) => {
  const prisma = getConn(c.env.DATABASE_URL);

  const tagName = c.req.param('tag');

  try {
    const findTag = await prisma.tag.findFirst({ where: { tag: tagName } });
    if (!findTag) {
      return c.json({ message: 'Tag not found.' }, StatusCode.NOTFOUND);
    }

    const posts = await prisma.tag.findMany({
      where: {
        tag: tagName,
      },
      select: {
        posts: {
          select: {
            author: { select: { username: true } },
            id: true,
            authorId: true,
            title: true,
            content: true,
            published: true,
          },
        },
      },
    });

    if (posts.length == 0) {
      return c.json(
        { message: 'Not posts found with this tag.' },
        StatusCode.NOTFOUND
      );
    }

    return c.json(posts);
  } catch (error) {}
};
