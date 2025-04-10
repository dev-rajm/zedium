import {
  CreateBlogSchema,
  UpdateBlogSchema,
  updateBlogSchema,
} from '@devrajm/zedium-common-app';
import { StatusCode } from '../constants/enums';
import { GetConnType } from '../libs/db';
import {
  validateCreateBlog,
  validateUpdateBlog,
} from '../validators/blog.validator';
import { sanitizeTag } from '../utils/sanitizeTag';

export const fetchAllBlogs = async (prisma: GetConnType) => {
  const blogs = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      publishedAt: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  if (blogs.length == 0) {
    throw {
      message: 'No blog posts created yet.',
      status: StatusCode.SUCCESS,
    };
  }

  return {
    blogs,
    status: StatusCode.SUCCESS,
  };
};

export const fetchBlogsByUserId = async (
  prisma: GetConnType,
  userId: string
) => {
  const blogs = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
  });

  if (blogs.length == 0) {
    throw {
      message: "You don't have any post yet.",
      status: StatusCode.SUCCESS,
    };
  }

  return {
    blogs,
    status: StatusCode.SUCCESS,
  };
};

export const fetchBlogsByBlogId = async (
  prisma: GetConnType,
  blogId: string
) => {
  const existingBlog = await prisma.post.findUnique({
    where: {
      id: blogId,
    },
    include: {
      tags: true,
    },
  });
  if (!existingBlog) {
    throw {
      message: "Post doesn't exist.",
      Status: StatusCode.NOTFOUND,
    };
  }

  return {
    blogs: existingBlog,
    status: StatusCode.SUCCESS,
  };
};

export const createNewBlog = async (
  prisma: GetConnType,
  payload: unknown,
  userId: string
) => {
  const data: CreateBlogSchema = validateCreateBlog(payload);
  const tagNames = sanitizeTag(data.tags || null);

  const blog = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      tags: {
        connectOrCreate: tagNames?.map(tag => ({
          where: { tag },
          create: { tag },
        })),
      },
      authorId: userId,
      published: data.published,
    },
    include: {
      tags: true,
    },
  });

  return {
    id: blog.id,
    status: StatusCode.CREATED,
  };
};

export const updateExistingBlogById = async (
  prisma: GetConnType,
  payload: unknown,
  blogId: string,
  userId: string
) => {
  const existingBlog = await prisma.post.findFirst({
    where: { id: blogId, authorId: userId },
  });

  if (!existingBlog) {
    throw {
      message: "Post doesn't exist.",
      status: StatusCode.NOTFOUND,
    };
  }

  const data: UpdateBlogSchema = validateUpdateBlog(payload);
  const tagNames = sanitizeTag(data.tags || null);

  const updatedBlog = await prisma.post.update({
    where: {
      id: blogId,
      authorId: userId,
    },
    data: {
      title: data.title,
      content: data.content,
      tags: {
        connectOrCreate: tagNames?.map(tag => ({
          where: { tag },
          create: { tag },
        })),
      },
      published: data.published,
    },
    include: {
      tags: true,
    },
  });

  return {
    blog: updatedBlog,
    status: StatusCode.SUCCESS,
  };
};

export const deleteExistingBlogById = async (
  prisma: GetConnType,
  blogId: string,
  userId: string
) => {
  const existingBlog = await prisma.post.findFirst({
    where: {
      id: blogId,
      authorId: userId,
    },
  });

  if (!existingBlog) {
    throw {
      message: "Post doesn't exist",
      status: StatusCode.NOTFOUND,
    };
  }

  await prisma.post.delete({
    where: {
      id: blogId,
      authorId: userId,
    },
  });

  return {
    message: `Post (id: ${blogId}) deleted.`,
    status: StatusCode.SUCCESS,
  };
};
