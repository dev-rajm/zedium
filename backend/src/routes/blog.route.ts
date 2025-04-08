import { Hono } from 'hono';
import {
  createBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  getBlogsByUser,
  updateBlogById,
} from '../controllers/blog.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = new Hono();

router.get('/bulk', getAllBlogs); // Get all posts
router.get('/blogs', authMiddleware, getBlogsByUser); // Get your owe posts
router.post('/', authMiddleware, createBlog); // Create post
router.get('/:id', authMiddleware, getBlogById); // Get post by post Id
router.put('/:id', authMiddleware, updateBlogById); // Edit post
router.delete('/:id', authMiddleware, deleteBlogById); // Delete post

export default router;
