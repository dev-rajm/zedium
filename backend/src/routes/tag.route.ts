import { Hono } from 'hono';
import { getAllTags, getPostsByTag } from '../controllers/tag.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = new Hono();

router.get('/tags', authMiddleware, getAllTags);
router.get('/:tag', authMiddleware, getPostsByTag);

export default router;
