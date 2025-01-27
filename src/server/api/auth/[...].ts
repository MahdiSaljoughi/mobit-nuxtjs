import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../prisma/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
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
      async authorize(credentials: { phone: string; code: string }) {
        if (!credentials.phone || !credentials.code) {
          throw "اطلاعات ورودی ناقص است";
        }

        const otpCode = await prisma.otp.findFirst({
          where: {
            phone: credentials.phone,
          },
          orderBy: {
            expiresAt: "desc",
          },
        });

        if (!otpCode) {
          throw {
            status: 401,
            message: "کد تایید یافت نشد",
          };
        }

        if (new Date() > otpCode.expiresAt) {
          await prisma.otp.delete({
            where: {
              id: otpCode.id,
            },
          });
          throw {
            status: 401,
            message: "کد تایید منقضی شده است",
          };
        }

        if (otpCode.code != credentials.code) {
          throw {
            status: 401,
            message: "کد تایید نامعتبر است",
          };
        }

        let userData = await prisma.user.findFirst({
          where: {
            phone: credentials.phone,
          },
        });

        if (!userData) {
          userData = await prisma.user.create({
            data: {
              phone: credentials.phone,
              user_name: credentials.phone,
              email: "",
              first_name: "",
              last_name: "",
            },
          });
        }

        await prisma.otp.delete({
          where: {
            id: otpCode.id,
          },
        });

        return userData;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          user_name: user.user_name,
          role: user.role,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        user_name: token.user_name,
        role: token.role,
      };

      return session;
    },
  },
});
