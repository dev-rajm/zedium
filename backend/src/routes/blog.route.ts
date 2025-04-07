import { Hono } from 'hono';

const router = new Hono();

router.get('/bulk');
router.get('/blogs');
router.get('/:id');
router.post('/');
router.put('/:id');
router.delete('/:id');

export default router;
