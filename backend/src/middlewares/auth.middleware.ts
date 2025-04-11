import { Context, Next } from 'hono';
import { verify } from 'hono/jwt';
import { StatusCode } from '../constants/StatusCodes';

async function authMiddleware(c: Context, next: Next) {
  const token = c.req.header('Authorization');
  if (!token) {
    return c.json(
      { message: 'You are unauthorized.' },
      StatusCode.UNAUTHORIZED
    );
  }
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      return c.json(
        { message: 'You are unauthorized.' },
        StatusCode.UNAUTHORIZED
      );
    }

    c.set('userId', payload.id);
    await next();
  } catch (error: any) {
    if (error.name == 'JwtTokenSignatureMismatched') {
      return c.json({ message: 'Invalid token.' }, StatusCode.UNAUTHORIZED);
    }
    return c.json(
      { message: 'Internal server error.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
}

export default authMiddleware;
