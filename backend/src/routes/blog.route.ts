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

router.get('/bulk', getAllBlogs);
router.get('/:id', getBlogById);

// Protected routes
router.post('/', authMiddleware, createBlog);
router.put('/:id', authMiddleware, updateBlogById);
router.get('/blogs', authMiddleware, getBlogsByUser);
router.delete('/:id', authMiddleware, deleteBlogById);

export default router;
