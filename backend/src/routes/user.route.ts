import { Hono } from "hono";

const router = new Hono();

router.post("/signup");
router.post("/signin");

export default router;
