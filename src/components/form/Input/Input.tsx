import { ReactNode, useState } from "react";

interface props {
  name: string;
  placeholder?: string;
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
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <div
      className={`${
        props.children ? "relative" : ""
      } flex flex-col w-full mt-4 ${props.className}`}
    >
      <span
        className={`font-semibold mb-1 transition-colors duration-300 ${
          inputFocused ? "text-white" : "text-grayblue-500"
        }`}
      >
        {capitalizeString(props.name)}
      </span>
      <input
        type={props.type}
        id={props.name}
        className={`bg-transparent w-full py-3 px-6 rounded-lg outline-none border-2 border-grayblue-700 shadow-sm shadow-transparent focus:shadow-blue-600/20 focus:border-blue-600 focus:shadow-2xl transition-colors placeholder:text-grayblue-500`}
        onClick={(e) => {
          if (props.onClick) props.onClick(e);
        }}
        onChange={(e) => {
          if (props.onChange) props.onChange(e);
        }}
        onFocus={(e) => {
          if (props.onFocus) props.onFocus(e);
          setInputFocused(true);
        }}
        onBlur={(e) => {
          if (props.onBlur) props.onBlur(e);
          setInputFocused(false);
        }}
        value={props.value}
        required={props.required}
        placeholder={props.placeholder}
      />
    </div>
  );
}
