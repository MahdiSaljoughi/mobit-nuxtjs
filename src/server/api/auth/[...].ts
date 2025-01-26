// import { NuxtAuthHandler } from "#auth";

// export default NuxtAuthHandler({});

import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NuxtAuthHandler({
  secret: "afafaafaf",
  // pages: {
  //   signIn: "/auth",
  // },
  providers: [
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: { label: "password", type: "password" },
      },
      authorize(credentials: any) {
        const user = {
          email: "test@email.com",
          password: "123",
        };

        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
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
