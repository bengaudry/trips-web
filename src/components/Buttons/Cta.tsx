import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { Link } from "react-router-dom";

export type CtaProps<T = "button" | "link"> = {
  children: string | ReactNode;
  className?: string;
  disabled?: boolean;
  type: T;
  color?: "normal" | "warning" | "danger" | "gradient" | "white";
  to?: string;
  loading?: boolean;
  target?: HTMLAttributeAnchorTarget;
  onClick?: CallableFunction;
  btnType?: "button" | "reset" | "submit";
};

export function Cta(props: CtaProps) {
  const CtaStyle = `${
    props.color === "danger"
      ? "bg-red-600 md:hover:bg-red-800 text-grayblue-100"
      : props.color === "warning"
      ? "bg-orange-600 md:hover:bg-orange-800  text-grayblue-100"
      : props.color === "gradient"
      ? "bg-gradient-to-r from-[#DA22FF] to-[#9733EE]  text-grayblue-100"
      : props.color === "white"
      ? "bg-white md:hover:bg-gray-100 text-black"
      : " text-grayblue-100 bg-brand-600 md:hover:bg-brand-800"
  }  font-semibold w-full rounded-full px-8 p-4 flex items-center justify-center gap-4 transition-colors transition-opacity duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-800 dark:disabled:text-neutral-400`;

  return props.type === "button" ? (
    <button
      className={`${CtaStyle} ${props.className}`}
      type={props.btnType ? props.btnType : "button"}
      disabled={props.disabled || props.loading}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
      }}
    >
      {props.loading && (
        <i className="fi fi-rr-loading block text-md translate-y-0.5" />
      )}
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
