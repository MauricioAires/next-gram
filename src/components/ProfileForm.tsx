"use client";

import { updateUserProfile } from "@/actions";
import { User } from "@/types/User";
import { Label } from "./Label";
import { Button } from "./Button";
import { ImagePreview } from "./ImagePreview";
import { useActionState } from "react";

export type ProfileFormProps = {
  user: User;
};
export function ProfilemForm({ user }: ProfileFormProps) {
  const [formState, formAction] = useActionState(updateUserProfile, {
    message: "",
    type: "success",
  });

  return (
    <div>
      {formState.message && <p>Algum texto</p>}

      <form action="" className="flex flex-col gap-4">
        <input type="hidden" name="id" value={user.id} />

        <div>
          <Label htmlFor="name" text="Nome" />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome"
            defaultValue={user.name || ""}
            className="p-2 border border-zinc-300 rounded w-full text-sm placeholder:text-zinc-500 focus:ring-0 "
          />
        </div>
        <ImagePreview />
        <div className="flex justify-end">
          <Button type="submit" text="Salvar" />
        </div>
      </form>
    </div>
  );
}
