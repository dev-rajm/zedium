import { Hono } from 'hono';
import userRoute from './user.route';
import blogRoute from './blog.route';

const router = new Hono();

router.route('/user', userRoute);
router.route('/blog', blogRoute);

export default router;
