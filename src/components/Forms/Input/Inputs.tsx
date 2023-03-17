import { ReactNode } from "react";

interface props {
  name: string;
  className?: string;
  children?: ReactNode;
  type: "email" | "text" | "password" | "number" | "hidden" | "date" | "time";
  onClick?: CallableFunction;
  onInput?: CallableFunction;
  onChange?: CallableFunction;
  defaultValue?: any;
}

function capitalizeString (str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function Input(props: props) {
  return (<div className={`${props.children ? "relative" : ""} flex flex-col`}>
    <label htmlFor={props.name} className="mt-4">
      {capitalizeString(props.name)}
    </label>
    <input
      type={props.type}
      id={props.name}
      className={`bg-slate-800 w-full h-full outline-none border-2 border-transparent py-2 px-4 rounded-lg focus:border-emerald-500 ${props.className}`}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
      }}
      onInput={(e) => {
        if (props.onInput) props.onInput(e);
      }}
      onChange={(e) => {
        if (props.onChange) props.onChange(e);
      }}
      value={props.defaultValue}
    />
    {props.children}
  </div>);
}
