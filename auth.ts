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
   session({ session, token}) {
    if(token.sub) session.user.userId = token.sub;

    return session;
   }
  },

  pages: {
    signIn: "/signIn"
  }
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

// Providers => minha página

interface ProviderWithId  {
  id: string;
  name: string;
}

// Mapear os providers
// Podemos agora acessar os providers na nossa página de login
// We can access the providers in us login page
export const providerMap = config.providers.map(provider => {

  const typeProvider = provider as unknown as ProviderWithId

  return {
    id: typeProvider.id,
    name: typeProvider.name
  }
})