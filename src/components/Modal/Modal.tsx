import { ReactNode } from "react";

interface ModalProps {
  isShown?: boolean;
  showFn: CallableFunction;
  children: ReactNode;
  title?: string;
}

export function Modal(props: ModalProps) {
  return (
    <div
      className={`${
        props.isShown
          ? "bg-black/80 pointer-events-auto"
          : "bg-transparent pointer-events-none"
      } fixed  flex flex-row items-end justify-start inset-0 transition-colors duration-500 z-50 lg:items-center`}
    >
      <button
        className="absolute z-40 w-full h-screen"
        onClick={() => props.showFn(false)}
      ></button>
      <div
        className={`${
          props.isShown
            ? "translate-y-0 opacity-100 pointer-events-auto lg:scale-100"
            : "translate-y-full opacity-0 pointer-events-none lg:scale-75 lg:translate-y-0"
        } pb-10 pt-3 px-8 rounded-t-3xl w-full mx-auto z-50 bg-grayblue-800 max-w-screen-sm transition-all duration-500 lg:duration-300 lg:rounded-xl lg:pt-10`}
      >
        <div className="w-12 mb-10 h-1 bg-grayblue-500 rounded-full m-auto lg:hidden"></div>
        {props.title ? (
          <h2 className="text-2xl font-semibold mb-4">{props.title}</h2>
        ) : (
          ""
        )}
        <>{props.children}</>
      </div>
    </div>
  );
}
