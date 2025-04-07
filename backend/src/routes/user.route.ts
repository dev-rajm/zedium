import { Hono } from 'hono';
import { signInHandler, signUpHandler } from '../controllers/user.controller';

const router = new Hono();

router.post('/signup', signUpHandler);
router.post('/signin', signInHandler);

export default router;
