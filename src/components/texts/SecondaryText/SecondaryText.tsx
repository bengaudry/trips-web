import { ReactNode } from "react";

export function SecondaryText(props: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-neutral-400 dark:text-grayblue-400 ${props.className}`}>
      {props.children}
    </p>
  );
}
