import { ReactNode } from "react";
import { capitalizeString } from "@/lib/functions";
import { Text } from "@/components";

type InputProps = {
  name: string;
  placeholder?: string;
  className?: string;
  children?: ReactNode;
  type: "email" | "text" | "password" | "number" | "hidden" | "date" | "time";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: any;
  required?: boolean;
};

export function Input(props: InputProps) {
  return (
    <div
      className={`${
        props.children ? "relative" : ""
      } flex flex-col w-full mt-4 ${props.className}`}
    >
      <Text.Secondary className="font-medium mb-1">
        {capitalizeString(props.name)}
        {props.required && " *"}
      </Text.Secondary>
      <input
        type={props.type}
        id={props.name}
        autoComplete="off"
        className={`bg-transparent w-full py-3 px-6 rounded-lg outline-none border-2 border-neutral-200 dark:border-white/10 shadow-sm shadow-transparent focus:shadow-blue-600/20 focus:border-blue-600 focus:shadow-2xl transition-colors dark:placeholder:text-grayblue-500`}
        onChange={(e) => {
          if (props.onChange) props.onChange(e);
        }}
        onFocus={(e) => {
          if (props.onFocus) props.onFocus(e);
        }}
        onBlur={(e) => {
          setTimeout(() => {
            if (props.onBlur) props.onBlur(e);
          }, 200);
        }}
        value={props.value}
        required={props.required}
        placeholder={props.placeholder}
      />
      {props.children}
    </div>
  );
}
