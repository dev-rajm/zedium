import { Hono } from 'hono';
import rootRoute from './routes/index.route';

const app = new Hono();

app.route('/api/v1', rootRoute);

export default app;
