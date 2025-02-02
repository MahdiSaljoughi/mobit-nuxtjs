import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../prisma/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// @ts-expect-error
import jwt from "jsonwebtoken";

const secret = useRuntimeConfig().authSecret;

export default NuxtAuthHandler({
  secret,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  providers: [
    // @ts-expect-error
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
            },
          });
        }

        const access_token = jwt.sign({ id: userData.id }, secret, {
          expiresIn: "30d",
        });

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
          // @ts-expect-error
          access_token: user.access_token,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        access_token: token.access_token as string,
      };
      return session;
    },
  },
});
