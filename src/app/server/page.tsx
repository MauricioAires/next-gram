import { auth } from "auth";

export default async function ServerPage() {
  const session = await auth();

  if (!session || !session.user) {
    return <p>Você precisa estar autenticado! Server</p>;
  }
  return (
    <div className="flex items-center">
      <p>Bem-vindo a server page!</p>
    </div>
  );
}
