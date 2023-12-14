import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { Link } from "react-router-dom";

export type CtaProps<T = "button" | "link"> = {
  children: string | ReactNode;
  className?: string;
  disabled?: boolean;
  type: T;
  color?: "normal" | "warning" | "danger" | "gradient" | "white";
  to?: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: CallableFunction;
  btnType?: "button" | "reset" | "submit";
};

export function Cta(props: CtaProps) {
  const CtaStyle = `${
    props.color === "danger"
      ? "bg-red-600 hover:bg-red-800  text-white"
      : props.color === "warning"
      ? "bg-orange-600 hover:bg-orange-800  text-white"
      : props.color === "gradient"
      ? "bg-gradient-to-r from-[#DA22FF] to-[#9733EE]  text-white"
      : props.color === "white"
      ? "bg-white hover:bg-gray-100 text-black"
      : " text-white bg-brand-600 hover:bg-brand-800"
  }  font-semibold w-full rounded-xl px-8 p-4 flex items-center justify-center gap-4 transition-colors transition-opacity duration-300 disabled:bg-grayblue-500/70 disabled:text-neutral-300 disabled:opacity-100 disabled:cursor-not-allowed`;

  return props.type === "button" ? (
    <button
      className={`${CtaStyle} ${props.className}`}
      type={props.btnType ? props.btnType : "button"}
      disabled={props.disabled}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
      }}
    >
      {props.children}
    </button>
  ) : (
    <Link
      to={props.to ? props.to : "/"}
      className={`${CtaStyle} ${props.className}`}
      target={props.target}
    >
      {props.children}
    </Link>
  );
}
