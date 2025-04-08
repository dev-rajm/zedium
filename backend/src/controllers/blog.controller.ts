import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';
import { StatusCode } from '../constants/enums';
import { createBlogSchema, updateBlogSchema } from '@devrajm/zedium-common-app';

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
        StatusCode.SUCCESS
      );
    }

    return c.json(posts, StatusCode.SUCCESS);
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

  const userId = c.get('userId');

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });

    if (posts.length == 0) {
      return c.json(
        { message: "You don't have any post yet." },
        StatusCode.SUCCESS
      );
    }

    return c.json(posts, StatusCode.SUCCESS);
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

    return c.json(post, StatusCode.SUCCESS);
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

  const userId = c.get('userId');

  try {
    const createPayload: {
      title: string;
      content: string;
      tags: string;
      published: boolean;
    } = await c.req.json();

    const { success } = createBlogSchema.safeParse(createPayload);
    if (!success) {
      return c.json({ message: 'Invalid blog format.' }, StatusCode.BADREQUEST);
    }

    const tagNames = createPayload.tags?.split(',').map(tag => tag.trim());

    const post = await prisma.post.create({
      data: {
        title: createPayload.title,
        content: createPayload.content,
        tags: {
          connectOrCreate: tagNames?.map(tag => ({
            where: { tag },
            create: { tag },
          })),
        },
        authorId: userId,
        published: createPayload.published,
      },
      include: {
        tags: true,
      },
    });

    return c.json({ id: post.id }, StatusCode.CREATED);
  } catch (error) {
    return c.json(
      { message: 'Internal server error. Please try again later.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
};

export const updateBlogById = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const postId = c.req.param('id');
  const userId = c.get('userId');

  try {
    const post = await prisma.post.findFirst({
      where: { id: postId, authorId: userId },
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

    const { success } = updateBlogSchema.safeParse(createPayload);
    if (!success) {
      return c.json({ message: 'Invalid blog format.' }, StatusCode.BADREQUEST);
    }

    const tagNames = createPayload.tags?.split(',').map(tag => tag.trim());

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
        authorId: userId,
      },
      data: {
        title: createPayload.title,
        content: createPayload.content,
        tags: {
          connectOrCreate: tagNames?.map(tag => ({
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

    return c.json(updatedPost, StatusCode.SUCCESS);
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
  const userId = c.get('userId');

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    if (!post) {
      return c.json({ message: "Post doesn't exist" }, StatusCode.NOTFOUND);
    }

    await prisma.post.delete({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    return c.json({ message: 'Post deleted.' }, StatusCode.SUCCESS);
  } catch (error) {
    return c.json(
      { message: 'Internal server error. Please try again later.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
};
