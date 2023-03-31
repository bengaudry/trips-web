import { ReactNode } from "react";

export function Modal(props: {
  isShown?: boolean;
  showFn: CallableFunction;
  children: ReactNode;
}) {
  return (
    <div
      className={`${
        props.isShown
          ? "bg-black/80 pointer-events-auto"
          : "bg-transparent pointer-events-none"
      } fixed z-50 w-full h-screen flex flex-row items-end justify-start inset-0 transition-colors duration-500`}
      onClick={() => props.showFn(false)}
    >
      <div
        className={`${
          props.isShown
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-full opacity-0 pointer-events-none"
        } pb-10 pt-3 px-8 rounded-t-3xl w-full bg-neutral-800 transition-all duration-500`}
      >
        <div className="w-12 mb-10 h-1 bg-neutral-500 rounded-full m-auto"></div>
        <>{props.children}</>
      </div>
    </div>
  );
}
