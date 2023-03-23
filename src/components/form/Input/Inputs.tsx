import { ReactNode } from "react";

interface props {
  name: string;
  className?: string;
  children?: ReactNode;
  type: "email" | "text" | "password" | "number" | "hidden" | "date" | "time";
  onClick?: CallableFunction;
  onChange?: CallableFunction;
  onFocus?: CallableFunction;
  onBlur?: CallableFunction;
  value?: any;
  required?: boolean;
}

function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function Input(props: props) {
  return (
    <div className={`${props.children ? "relative" : ""} flex flex-col w-full`}>
      <div className="w-full h-full bg-neutral-900 rounded-xl border-2 border-neutral-700 mt-4">
        <input
          type={props.type}
          id={props.name}
          className={`bg-transparent w-full h-max py-3 px-6 rounded-lg outline-blue-600 placeholder:text-neutral-500 ${props.className}`}
          onClick={(e) => {
            if (props.onClick) props.onClick(e);
          }}
          onChange={(e) => {
            if (props.onChange) props.onChange(e);
          }}
          onFocus={(e) => {
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            if (props.onBlur) props.onBlur(e);
          }}
          value={props.value}
          required={props.required}
          placeholder={capitalizeString(props.name).replaceAll("-", " ")}
        />
      </div>
      {props.children}
    </div>
  );
}
