import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";

const secret = useRuntimeConfig().authSecret;

export default NuxtAuthHandler({
  secret,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  providers: [
    // @ts-ignore
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
          throw new Error("اطلاعات ورودی ناقص است"); // Use Error for better error handling
        }

        try {
          const res = await fetch("https://api-moobit.vercel.app/auth", {
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
