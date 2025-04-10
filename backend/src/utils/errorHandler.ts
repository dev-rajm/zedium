import { Context } from 'hono';
import { StatusCode } from '../constants/enums';

const handleError = (c: Context, error: any) => {
  console.log(`Error: ${error.message}`);
  return c.json(
    {
      message: error.message || 'Internal server error',
      ...(error.errors && { errors: error.errors }),
    },
    error.status || StatusCode.INTERNALSERVERERROR
  );
};

export default handleError;
