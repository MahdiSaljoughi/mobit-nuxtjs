import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    access_token: string;
  }

  interface Session extends DefaultSession {
    user: {
      access_token: string;
    };
  }
}
