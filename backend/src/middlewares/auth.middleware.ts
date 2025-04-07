import { Context, Next } from 'hono';
import { verify } from 'hono/jwt';

enum StatusCode {
  UNAUTHORIZED = 403,
  INTERNALSERVERERROR = 500,
}

async function authMiddleware(c: Context, next: Next) {
  const token = c.req.header('Authorization');
  if (!token || !token.startsWith('Bearer')) {
    return c.json(
      { message: 'You are unauthorized. Please signin first' },
      StatusCode.UNAUTHORIZED
    );
  }

  const jwtToken = token.split(' ')[1];
  try {
    const payload = await verify(jwtToken, c.env.JWT_SECRET);
    if (!payload) {
      return c.json(
        { message: 'You are unauthorized. Please signin first' },
        StatusCode.UNAUTHORIZED
      );
    }

    c.set('userId', payload.id);
    await next();
  } catch (error) {
    return c.json(
      { message: 'Internal server error. Please try again later.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
}

export default authMiddleware;
