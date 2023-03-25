import { ReactNode } from "react";

export function Modal(props: {
  isShown?: boolean;
  showFn: CallableFunction;
  children: ReactNode;
}) {
  return (
    <div
      className={`${
        props.isShown ? "flex" : "hidden"
      } bg-black/95 fixed z-50 w-screen h-screen flex flex-row items-end justify-start`}
      onClick={() => props.showFn(false)}
    >
      <div className="pb-10 pt-3 px-8 rounded-t-3xl w-full bg-neutral-800">
        <div className="w-12 mb-10 h-1 bg-neutral-500 rounded-full m-auto"></div>
        <>{props.children}</>
      </div>
    </div>
  );
}
