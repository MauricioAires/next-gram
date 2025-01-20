import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

import google from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const config: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    // O padrão do next-auth é o session.
    // Session é mais seguro mas o Prisma ainda não está atualizado para utilizar o session.
  },
  providers: [google],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;

      if (pathname === "/middleware") {
        return !!auth;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
