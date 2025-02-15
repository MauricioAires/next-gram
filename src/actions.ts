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

export type FormState = {
  message: string;
  type: string;
};

export async function updateUserProfile(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  return {
    message: "Profile updated successfully!",
    type: "success",
  };
}
