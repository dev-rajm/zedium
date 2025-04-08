import { Hono } from 'hono';
import userRoute from './user.route';
import blogRoute from './blog.route';
import tagRoute from './tag.route';

const router = new Hono();

router.route('/user', userRoute);
router.route('/blog', blogRoute);
router.route('/tag', tagRoute);

export default router;
