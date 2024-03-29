import { ReactNode, useEffect } from "react";
import { BackButton } from "@/components";

export function SlidingPage(props: {
  children: ReactNode;
  setPanelOpened: (val: boolean) => void;
  isOpened: boolean;
  className?: string;
  outerClassName?: string;
}) {
  useEffect(() => {
    if (props.isOpened) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "auto";
  });
  return (
    <div
      className={`${
        props.isOpened ? "translate-x-0" : "translate-x-[100vw]"
      } z-40 fixed right-0 top-0 w-full lg:w-[calc(100vw-18rem)] h-screen bg-white dark:bg-grayblue-900 transition-transform duration-500 overflow-y-hidden ${
        props.outerClassName
      }`}
    >
      <main className="px-5 py-16 max-w-screen-sm w-full mx-auto h-full overflow-y-scroll">
        <BackButton onClick={() => props.setPanelOpened(false)} />
        {props.children}
      </main>
    </div>
  );
}
