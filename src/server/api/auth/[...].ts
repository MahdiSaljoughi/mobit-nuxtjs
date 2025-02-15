import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";

const config = useRuntimeConfig();
const secret = config.authSecret;

export default NuxtAuthHandler({
  secret,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  providers: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        phone: {
          label: "phone",
          type: "text",
        },
        otp: { label: "otp", type: "text" },
      },
      async authorize(credentials: { phone: string; otp: string }) {
        if (!credentials.phone || !credentials.otp) {
          throw new Error("اطلاعات ورودی ناقص است");
        }

        try {
          const res = await fetch(`${config.public.apiBase}/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              otp: credentials.otp,
              phone: credentials.phone,
            }),
          });

          return await res.json();
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, access_token: user.access_token };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        access_token: token.access_token as string,
      };
      return session;
    },
  },
});
