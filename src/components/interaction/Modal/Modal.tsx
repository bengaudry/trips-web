import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { SecondaryText } from "../../texts";

interface ModalProps {
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title?: string | ReactNode;
  unClosable?: boolean;
}

export function Modal(props: ModalProps) {
  const [shakingAnim, setShakingAnim] = useState(false);

  useEffect(() => {
    if (shakingAnim) {
      setTimeout(() => {
        setShakingAnim(false);
      }, 300);
    }
  }, [shakingAnim]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, [props.visible]);

  return (
    <div
      className={`${
        props.visible
          ? "bg-black/80 pointer-events-auto"
          : "bg-transparent pointer-events-none"
      } fixed flex flex-row items-end justify-start inset-0 transition-colors duration-500 z-50 lg:items-center`}
    >
      <button
        className={`absolute z-40 w-full h-screen  ${
          props.unClosable && "cursor-not-allowed"
        }`}
        onClick={() => {
          if (props.unClosable) setShakingAnim(true);
          if (props.setVisible) props.setVisible(false);
        }}
      />
      <div
        className={`${
          props.visible
            ? "translate-y-0 opacity-100 pointer-events-auto lg:scale-100"
            : "translate-y-full opacity-0 pointer-events-none lg:scale-75 lg:translate-y-0"
        } pt-3 rounded-t-3xl w-full overflow-hidden mx-auto z-50 bg-white dark:bg-grayblue-800 max-w-screen-sm transition-all duration-500 lg:duration-300 lg:rounded-xl lg:pt-10 ${
          shakingAnim && "shaking-modal-anim"
        }`}
      >
        <div className="w-12 mb-10 h-1 bg-grayblue-500 rounded-full m-auto lg:hidden"></div>
        <div className="flex flex-row items-center justify-between px-8">
          {props.title && (
            <h2 className="text-2xl font-semibold mb-4">{props.title}</h2>
          )}
          <button
            onClick={() => {
              if (props.setVisible) props.setVisible(false);
            }}
          >
            <SecondaryText className="hidden lg:block  hover:text-black dark:hover:text-white transition-colors">
              <i
                className={`fi fi-rr-cross -translate-y-2  ${
                  props.unClosable && "hidden"
                }`}
              />
            </SecondaryText>
          </button>
        </div>
        <main className="max-h-[70vh] overflow-scroll px-8 pb-10">
          {props.children}
        </main>
      </div>
    </div>
  );
}
