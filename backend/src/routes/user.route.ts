import { Hono } from "hono";
import { signUpHandler } from "../controllers/user.controller";

const router = new Hono();

router.post("/signup", signUpHandler);
router.post("/signin");

export default router;
