import { defineEventHandler, getCookie } from "h3";
import type { H3Event } from "h3";

export default defineEventHandler((event: H3Event) => {
  const sessionToken = getCookie(event, process.env.SESSION_NAME || "");

  if (!sessionToken) {
    return { error: "Session token not found" };
  }

  return { session_token: sessionToken };
});
