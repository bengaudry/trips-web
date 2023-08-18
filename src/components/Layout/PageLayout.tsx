import { ReactNode } from "react";

export function PageLayout(props: {
  title?: string | null;
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={`px-5 py-12 pb-44 ${props.className}`} role="page">
      <h1 className="text-4xl font-bold mb-3">{props.title ?? ""}</h1>
      {props.children}
    </main>
  );
}
