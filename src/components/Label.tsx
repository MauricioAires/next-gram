import { ComponentProps } from "react";

export type LabelProps = ComponentProps<"label"> & {
  text: string;
};

export function Label({ text, ...props }: LabelProps) {
  return (
    <label className="text-sm font-medium text-black" {...props}>
      {text}
    </label>
  );
}
