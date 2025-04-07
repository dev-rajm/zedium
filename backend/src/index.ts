import { Hono } from 'hono';
import rootRoute from './routes/index.route';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(cors());

app.route('/api/v1', rootRoute);

export default app;
