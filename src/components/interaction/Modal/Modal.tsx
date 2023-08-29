import { ReactNode } from "react";
import { SecondaryText } from "../../texts";

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
      } fixed flex flex-row items-end justify-start inset-0 transition-colors duration-500 z-50 lg:items-center`}
    >
      <button
        className="absolute z-40 w-full h-screen"
        onClick={() => props.showFn(false)}
      />
      <div
        className={`${
          props.isShown
            ? "translate-y-0 opacity-100 pointer-events-auto lg:scale-100"
            : "translate-y-full opacity-0 pointer-events-none lg:scale-75 lg:translate-y-0"
        } pb-10 pt-3 px-8 rounded-t-3xl w-full mx-auto z-50 bg-white dark:bg-grayblue-800 max-w-screen-sm transition-all duration-500 lg:duration-300 lg:rounded-xl lg:pt-10`}
      >
        <div className="w-12 mb-10 h-1 bg-grayblue-500 rounded-full m-auto lg:hidden"></div>
        <div className="flex flex-row items-center justify-between">
          {props.title ? (
            <h2 className="text-3xl font-semibold mb-4">{props.title}</h2>
          ) : (
            ""
          )}
          <button onClick={() => props.showFn(false)}>
            <SecondaryText className="hidden lg:block  hover:text-black dark:hover:text-white transition-colors">
              <i className="fi fi-rr-cross -translate-y-2" />
            </SecondaryText>
          </button>
        </div>
        <>{props.children}</>
      </div>
    </div>
  );
}
