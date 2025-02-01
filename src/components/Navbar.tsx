import { getUserByEmail } from "@/actions";
import { auth, signIn, signOut } from "auth";
import Link from "next/link";

export async function Navbar() {
  const session = await auth();

  const user = await getUserByEmail(session?.user.email);

  return (
    <nav className="bg-gray-800 text-white px-10 py-5 flex justify-between items-center">
      <Link
        href="/"
        className="text-white hover:text-zinc-200 text-lg font-bold"
      >
        NextGram
      </Link>

      <div>
        {user ? (
          <div className="flex gap-4 items-center">
            <p>{user.name}</p>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="signIn"
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
