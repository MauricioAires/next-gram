"use server";

import { PrismaClient, User } from "@prisma/client";
import { auth } from "auth";
import { redirect } from "next/navigation";
import path, { relative } from "node:path";
import { promises as fs } from "node:fs";
import { revalidatePath } from "next/cache";

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
  const session = await auth();

  if (!session) redirect("/");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const imageFile = formData.get("image") as File;

  if (name.length < 5) {
    return {
      message: "Nome precisa ter pelo menos 5 caracteres",
      type: "error",
    };
  }

  if (session.user.userId !== id) {
    throw new Error("Não autorizado!");
  }

  // save image in the server

  let imageUrl;

  if (imageFile && imageFile.name !== "undefined") {
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // create directory if it doesn't exist
    fs.mkdir(uploadDir, {
      recursive: true,
    });

    const filePath = path.join(uploadDir, imageFile.name);

    const arrayBuffer = await imageFile.arrayBuffer();

    // crate the image in the directory
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    imageUrl = `/uploads/${imageFile.name}`;
  }

  const dataToUpdate = imageUrl
    ? {
        name,
        image: imageUrl,
      }
    : {
        name,
      };

  await prisma.user.update({
    where: {
      id,
    },
    data: dataToUpdate,
  });

  revalidatePath("/profile");

  return {
    message: "Profile updated successfully!",
    type: "success",
  };
}
