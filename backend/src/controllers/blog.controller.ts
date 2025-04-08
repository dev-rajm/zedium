import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';

enum StatusCode {
  INTERNALSERVERERROR = 500,
  BADREQUEST = 400,
  NOTFOUND = 404,
  FORBIDDEN = 403,
  OK = 200,
}

export const getAllBlogs = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      include: {
        tags: true,
        author: true,
      },
    });
    if (posts.length == 0) {
      return c.json(
        { message: 'Be first to publish a blog post.' },
        StatusCode.OK
      );
    }

    return c.json(posts, StatusCode.OK);
  } catch (error) {
    return c.json(
      { message: 'Internal server error. Please try again later.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
};

export const getBlogsByUser = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { id } = c.get('userId');

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: id,
      },
    });

    if (posts.length == 0) {
      return c.json({ message: "You don't have any post yet." }, StatusCode.OK);
    }

    return c.json(posts, StatusCode.OK);
  } catch (error) {
    return c.json(
      { message: 'Internal server error. Please try again later.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
};

export const getBlogById = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param('id');

  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });
    if (!post) {
      return c.json({ message: "Post doesn't exist." }, StatusCode.NOTFOUND);
    }

    return c.json(post, StatusCode.OK);
  } catch (error) {
    return c.json(
      { message: 'Internal server error. Please try again later.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
};

export const createBlog = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { id } = c.get('userId');

  try {
    const createPayload: {
      title: string;
      content: string;
      tags: string;
      published: boolean;
    } = await c.req.json();

    const tagNames = createPayload.tags?.split(',').map(tag => tag.trim());
    if (!createPayload.title && !createPayload.content) {
      return c.json({ message: 'Invalid blog format.' }, StatusCode.FORBIDDEN);
    }

    const post = await prisma.post.create({
      data: {
        title: createPayload.title,
        content: createPayload.content,
        authorId: id,
        tags: {
          connectOrCreate: tagNames.map(tag => ({
            where: { tag },
            create: { tag },
          })),
        },
        published: createPayload.published,
      },
      include: {
        tags: true,
      },
    });

    return c.json({ id: post.id }, StatusCode.OK);
  } catch (error) {
    return c.json(
      {
        message: 'Internal server error. Please try again later.',
      },
      StatusCode.INTERNALSERVERERROR
    );
  }
};

export const updateBlogById = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const postId = c.req.param('id');
  const { id } = c.get('userId');

  try {
    const post = await prisma.post.findFirst({
      where: { id: postId, authorId: id },
    });

    if (!post) {
      return c.json({ message: "Post doesn't exist." }, StatusCode.NOTFOUND);
    }

    const createPayload: {
      title: string;
      content: string;
      tags: string;
      published: boolean;
    } = await c.req.json();
    const tagNames = createPayload.tags?.split(',').map(tag => tag.trim());

    if (!createPayload.title || !createPayload.content) {
      return c.json({ message: 'Invalid blog format' }, StatusCode.FORBIDDEN);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
        authorId: id,
      },
      data: {
        title: createPayload.title,
        content: createPayload.content,
        tags: {
          connectOrCreate: tagNames.map(tag => ({
            where: { tag },
            create: { tag },
          })),
        },
        published: createPayload.published,
      },
      include: {
        tags: true,
      },
    });

    return c.json(updatedPost, StatusCode.OK);
  } catch (error) {
    return c.json(
      { message: 'Internal server error. Please try again later.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
};

export const deleteBlogById = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const postId = c.req.param('id');
  const { id } = c.get('userId');

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        authorId: id,
      },
    });

    console.log(post);

    if (!post) {
      return c.json({ message: "Post doesn't exist" }, StatusCode.NOTFOUND);
    }

    await prisma.post.delete({
      where: {
        id: postId,
        authorId: id,
      },
    });

    return c.json({ message: 'Post deleted.' }, StatusCode.OK);
  } catch (error) {
    return c.json(
      { message: 'Internal server error. Please try again later.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
};
