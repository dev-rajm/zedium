import { Hono } from 'hono';
import {
  createBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  getBlogsByUser,
  updateBlogById,
} from '../controllers/blog.controller';

const router = new Hono();

router.get('/bulk', getAllBlogs);
router.get('/blogs', getBlogsByUser);
router.get('/:id', getBlogById);
router.post('/', createBlog);
router.put('/:id', updateBlogById);
router.delete('/:id', deleteBlogById);

export default router;
