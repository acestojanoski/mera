import { handle } from "@hono/netlify";
import { type Config } from "@netlify/functions";
import { app } from "../src/app.js";

export default handle(app);

export const config: Config = {
  path: "/api*",
};
