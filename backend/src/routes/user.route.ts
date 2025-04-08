import { Hono } from 'hono';
import {
  signInHandler,
  signUpHandler,
  userProfile,
} from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = new Hono();

router.post('/signup', signUpHandler);
router.post('/signin', signInHandler);
router.get('/profile', authMiddleware, userProfile);

export default router;
