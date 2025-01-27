import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: "/auth",
  },
  providers: [
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        phone: {
          label: "phone",
          type: "text",
        },
        code: { label: "code", type: "text" },
      },
      authorize(credentials: { phone: string; code: string }) {
        const user = {
          phone: "test@email.com",
          code: "123",
        };

        if (
          credentials?.phone === user.phone &&
          credentials?.code === user.code
        ) {
          return user;
        } else {
          console.error(
            "Warning: Malicious login attempt registered, bad credentials provided"
          );
          return null;
        }
      },
    }),
  ],
});
