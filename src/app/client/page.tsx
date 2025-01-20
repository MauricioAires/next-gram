"use client";

import { useSession } from "next-auth/react";

export default function ClientPage() {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return <p>Você precisa estar autenticado!</p>;
  }

  return (
    <div>
      <h1>Componente client autenticado</h1>
    </div>
  );
}
