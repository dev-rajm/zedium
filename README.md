# Zedium Blogs

Zedium is a modern blogging application inspired by platform like Medium, designed to empower users to share their ideas and stories with the world.

## Tech Stack

- **Language**: Typescript.
- **Frontend**: React.js.
- **Backend**: Hono, Zod, Prisma.
- **Database**: PostgreSQL.
- **Hosting**: Cloudflare Workers (Backend), AWS EC2 (Frontend).

## Backend System Overview

## Setup Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/dev-rajm/zedium.git
   ```

2. Install dependencies:

   ```bash
   # Install backend dependencies
   cd backend && npm install

   # Install frontend dependencies
   cd ../frontend && npm install
   ```

3. Create environment variables in `.env` file:

   ```env
   DATABASE_URL=<your-postgres-connection-url>
   ```

4. Migrate the schema:

   ```bash
   npx prisma migrate dev --name init_schema
   ```

5. Generate clients:

   ```bash
   npx prisma generate --no-engine
   ```

6. Create `wrangler.toml` or `wrangler.jsonc` (you need a accelerate postgres url, get it for free from [prisma accelerate](https://www.prisma.io/data-platform/accelerate)):

   ```toml
   #wrangler.toml

   name = "backend"
   main="src/index.ts"
   compatibility_date = "2025-04-07"

   [vars]

    DATABASE_URL: <your-postgres-accelerate-url>,
    JWT_SECRET: <your-jwt-secret>
   ```

   ```jsonc
   // wrangler.jsonc

   "$schema": "node_modules/wrangler/config-schema.json",
   "name": "backend",
   "main": "src/index.ts",
   "compatibility_date": "2025-04-07",
   "vars": {
       "DATABASE_URL": <your-postgres-accelerate-url>,
       "JWT_SECRET": <your-jwt-secret>
   }

   ```

7. Start the backend server:

   ```bash
   npm run dev
   ```

8. To Deploy (you need a cloudflare account before deploy it):

   ```bash
   # Login to cloudflare workers
   npx wrangler login

   # Deploy to worker
   npx wrangler deploy
   ```
