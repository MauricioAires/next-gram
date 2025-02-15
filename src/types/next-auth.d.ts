

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /**
       * Sobrescreve a interface do usuário no NextAuth para adicionar
       * novas informações.
       */
      userId: string | undefined;
    } & DefaultSession['user']
  }
}