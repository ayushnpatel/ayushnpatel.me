import { serve } from "bun";
import index from "../index.html";

const server = serve({
  routes: {
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
