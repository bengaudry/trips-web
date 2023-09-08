import { ReactNode } from "react";
import { Text } from "components";

export function PageLayout(props: {
  title?: string | null;
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={`px-5 py-12 ${props.className}`} role="page">
      <Text.Title className="mb-3">{props.title ?? ""}</Text.Title>
      {props.children}
    </main>
  );
}
