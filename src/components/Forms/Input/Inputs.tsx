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
      <label htmlFor={props.name} className="mt-4">
        {capitalizeString(props.name)}
      </label>
      <div className="w-full h-full bg-slate-800 rounded-lg">
        <input
          type={props.type}
          id={props.name}
          className={`bg-slate-800 w-full h-max outline-none border-2 border-transparent py-2 px-4 rounded-lg focus:border-emerald-500 ${props.className}`}
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
        />
      </div>
      {props.children}
    </div>
  );
}
