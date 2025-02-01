import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../prisma/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import jwt from "jsonwebtoken";

export default NuxtAuthHandler({
  secret: process.env.NUXT_AUTH_SECRET,
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

        const access_token = jwt.sign(
          { id: userData.id },
          process.env.NUXT_AUTH_SECRET,
          { expiresIn: "1h" }
        );

        // **آپدیت یوزر و ذخیره accessToken در دیتابیس**
        userData = await prisma.user.update({
          where: { id: userData.id },
          data: { access_token },
        });

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
          access_token: user.access_token,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        access_token: token.access_token,
      };
      return session;
    },
  },
});
