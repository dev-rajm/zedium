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
router.get('/blogs', authMiddleware, getBlogsByUser);
router.get('/:id', authMiddleware, getBlogById);
router.post('/', authMiddleware, createBlog);
router.put('/:id', authMiddleware, updateBlogById);
router.delete('/:id', authMiddleware, deleteBlogById);

export default router;
