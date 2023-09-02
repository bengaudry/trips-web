import { useState } from "react";
import { capitalizeString } from "../../../lib/functions";
import { SecondaryText } from "../../texts";

type TextareaProps = {
  className?: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    value: string,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  resize?: "x" | "y" | "both";
  required?: boolean;
};

export function Textarea(props: TextareaProps) {
  const resizeClassname =
    props.resize === "x"
      ? "resize-x"
      : props.resize === "y"
      ? "resize-y"
      : props.resize === "both"
      ? "resize"
      : "resize-none";

  return (
    <div className={`flex flex-col w-full mt-4 ${props.className}`}>
      <SecondaryText className="font-medium mb-1 transition-colors duration-300">
        {capitalizeString(props.name)}
        {props.required && " *"}
      </SecondaryText>
      <textarea
        id={props.name}
        autoComplete="off"
        className={`bg-transparent w-full h-full py-3 px-6 rounded-lg outline-none border-2 border-neutral-200 dark:border-grayblue-700 shadow-sm shadow-transparent focus:shadow-blue-600/20 focus:border-blue-600 focus:shadow-2xl transition-colors dark:placeholder:text-grayblue-500 ${resizeClassname}`}
        onChange={(e) => {
          if (props.onChange) props.onChange(e.target.value, e);
        }}
        value={props.value}
        required={props.required}
        placeholder={props.placeholder}
      />
    </div>
  );
}
