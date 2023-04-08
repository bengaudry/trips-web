import { ReactNode } from "react";

export function Modal(props: {
  isShown?: boolean;
  showFn: CallableFunction;
  children: ReactNode;
  title?: string;
}) {
  return (
    <div
      className={`${
        props.isShown
          ? "bg-black/80 pointer-events-auto"
          : "bg-transparent pointer-events-none"
      } fixed flex flex-row items-end justify-start inset-0 transition-colors duration-500 z-50`}
    >
      <button
        className="absolute z-40 w-full h-screen"
        onClick={() => props.showFn(false)}
      ></button>
      <div
        className={`${
          props.isShown
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-full opacity-0 pointer-events-none"
        } pb-10 pt-3 px-8 rounded-t-3xl w-full z-50 bg-grayblue-800 transition-all duration-500`}
      >
        <div className="w-12 mb-10 h-1 bg-grayblue-500 rounded-full m-auto"></div>
        {props.title ? (<h2 className="text-2xl font-semibold mb-4">{props.title}</h2>) : ""}
        <>{props.children}</>
      </div>
    </div>
  );
}
