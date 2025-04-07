import { Context } from "hono";

export const signUpHandler = async (c: Context) => {
  c.text("signup controller");
};
