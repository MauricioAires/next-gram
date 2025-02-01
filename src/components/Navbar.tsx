import { auth, signIn, signOut } from "auth";
import Link from "next/link";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-white text-lg font-bold">
        Home
      </Link>

      <div>
        {session && session.user ? (
          <div className="flex gap-4 items-center">
            <p>{session.user.name}</p>
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
