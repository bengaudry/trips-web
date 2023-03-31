import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface props {
  children: string | ReactNode;
  className?: string;
  type: "button" | "link";
  color?: "normal" | "warning" | "danger";
  to?: string;
  onClick?: CallableFunction;
  btnType?: "button" | "reset" | "submit";
}

export function Cta(props: props) {
  const CtaStyle = `${
    props.color === "danger"
      ? "bg-red-600 hover:bg-red-800"
      : props.color === "warning"
      ? "bg-orange-600 hover:bg-orange-800"
      : "bg-violet-600 hover:bg-violet-800"
  } text-white font-semibold w-full rounded-lg px-8 p-4 flex items-center justify-center gap-4 transition-colors duration-300`;

  return props.type === "button" ? (
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
