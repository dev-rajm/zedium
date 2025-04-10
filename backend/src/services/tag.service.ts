import { StatusCode } from '../constants/enums';
import { GetConnType } from '../libs/db';

export const fetchAllTags = async (prisma: GetConnType) => {
  const tags = await prisma.tag.findMany();
  if (tags.length == 0) {
    throw {
      message: 'No tags created yet.',
      status: StatusCode.SUCCESS,
    };
  }

  return {
    tags,
    status: StatusCode.SUCCESS,
  };
};

export const fetchAllBlogsByTagName = async (
  prisma: GetConnType,
  tagName: string
) => {
  const existingTag = await prisma.tag.findFirst({ where: { tag: tagName } });
  if (!existingTag) {
    throw {
      message: 'Tag not found.',
      status: StatusCode.NOTFOUND,
    };
  }

  const blogs = await prisma.tag.findMany({
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

  if (blogs.length == 0) {
    throw {
      message: 'Not posts found with this tag.',
      status: StatusCode.NOTFOUND,
    };
  }

  return { blogs, status: StatusCode.SUCCESS };
};
