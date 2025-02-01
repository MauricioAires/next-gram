"use server";

import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserByEmail(
  email: string | undefined | null
): Promise<User | null> {
  if (!email) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
}
