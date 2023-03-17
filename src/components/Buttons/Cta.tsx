import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface props {
  children: string | ReactNode;
  className?: string;
  func: "button" | "link";
  to?: string;
  onClick?: CallableFunction;
  btnType?: "button" | "reset" | "submit";
}

export function Cta(props: props) {
  const CtaStyle =
    "bg-emerald-500 text-white font-semibold w-full rounded-lg px-8 p-4 flex items-center justify-center gap-4 transition-colors duration-300 hover:bg-emerald-700";

  return props.func === "button" ? (
    <button
      className={`${CtaStyle} ${props.className}`}
      type={props.btnType ? props.btnType : "button"}
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
    >
      {props.children}
    </Link>
  );
}
