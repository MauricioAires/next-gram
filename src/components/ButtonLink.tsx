import Link from "next/link";

export type ButtonLinkProps = {
  text: string;
  url: string;
};
export function ButtonLink({ text, url }: ButtonLinkProps) {
  return (
    <Link
      href={url}
      className="w-fit h-8 bg-blue-800 hover:bg-blue-700 text-sm font-medium text-white py-1 px-6 rounded flex  items-center"
    >
      {text}
    </Link>
  );
}
