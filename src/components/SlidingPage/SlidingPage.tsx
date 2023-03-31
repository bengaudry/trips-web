import { ReactNode } from "react";
import { BackButton } from "../../components";

export function SlidingPage(props: {
  children: ReactNode;
  setPanelOpened: CallableFunction;
  isOpened: boolean;
  className?: string;
  outerClassName?: string;
}) {
  return (
    <div
      className={`${
        props.isOpened ? "-translate-x-1/2" : "translate-x-[100vw]"
      } px-5 py-16 z-40 fixed left-1/2 top-0 w-full max-w-screen-sm h-screen bg-grayblue-900 transition-transform duration-500 overflow-y-scroll ${
        props.outerClassName
      }`}
    >
      <BackButton onClick={() => props.setPanelOpened(false)} />
      {props.children}
    </div>
  );
}
