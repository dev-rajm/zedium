import { Context, Next } from 'hono';
import { verify } from 'hono/jwt';
import { StatusCode } from '../constants/StatusCodes';

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
  } catch (error: any) {
    if (error.name == 'JwtTokenSignatureMismatched') {
      return c.json(
        { message: 'Invalid token. Please signin again.' },
        StatusCode.UNAUTHORIZED
      );
    }
    return c.json(
      { message: 'Internal server error. Please try again later.' },
      StatusCode.INTERNALSERVERERROR
    );
  }
}

export default authMiddleware;
