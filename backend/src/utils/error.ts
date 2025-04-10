import { Context } from 'hono';
import { StatusCode } from '../constants/enums';

const handleError = (c: Context, error: unknown) => {
  console.log(`Error: ${error}`);
  return c.json(
    { message: 'Internal server error.' },
    StatusCode.INTERNALSERVERERROR
  );
};

export default handleError;
