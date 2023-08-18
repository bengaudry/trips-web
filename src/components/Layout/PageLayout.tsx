import { ReactNode } from "react";

export function PageLayout(props: {
  title?: string | null;
  children: ReactNode;
}) {
  return (
    <main className="px-5 py-16 pb-44" role="page">
      <h1 className="text-4xl font-bold mb-3">{props.title ?? "zizi"}</h1>
      {props.children}
    </main>
  );
}
