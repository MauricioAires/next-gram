import { useEffect, useState } from "react";

export interface FlashMessageProps {
  message: string;
  type: string;
}

export function FlashMessage({ message, type }: FlashMessageProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-6 right-6 p-4 shadow-md text-white ${
        type === "success" ? "bg-emerald-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
}
