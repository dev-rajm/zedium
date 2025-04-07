import { Context } from 'hono';

export const getAllBlogs = async (c: Context) => {
  c.text('Get all blog posts');
};

export const getBlogsByUser = async (c: Context) => {
  c.text('Get user specific blog posts');
};

export const getBlogById = async (c: Context) => {
  c.text('Get user specific blog posts');
};

export const createBlog = async (c: Context) => {
  c.text('Get user specific blog posts');
};

export const updateBlogById = async (c: Context) => {
  c.text('Get user specific blog posts');
};

export const deleteBlogById = async (c: Context) => {
  c.text('Get user specific blog posts');
};
