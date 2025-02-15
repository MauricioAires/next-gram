"use client";

import Image from "next/image";
import { useState } from "react";
import { Label } from "./Label";

export function ImagePreview() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setSelectedImage(file);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      {imagePreview && (
        <div className="flex justify-center mb-4">
          <Image
            src={imagePreview}
            alt="Pré-visualização da imagem"
            className="w-[494px] h-[492px] object-cover"
            height={494}
            width={494}
          />
        </div>
      )}

      <Label text="Selecione uma imagem" htmlFor="image" />
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        className="p-2 border border-zinc-300 rounded w-full text-sm placeholder:text-zinc-500 focus:ring-0 "
      />

      {selectedImage && (
        <input type="hidden" name="image" value={selectedImage.name} />
      )}
    </div>
  );
}
