import { useState } from "react";
import { capitalizeString } from "../../../lib/functions";
import { SelectOption } from "../types";

interface SelectProps {
  name: string;
  className?: string;
  selectedOption: string;
  setSelectedOption: (opt: string) => void;
  options: SelectOption[];
}

export function Select(props: SelectProps) {
  const [isOpened, setOpened] = useState(false);

  const labelToId = (label: string) => {
    return label.toLowerCase().replaceAll(" ", "-");
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={labelToId(props.name)}
        className="mt-4 font-medium text-neutral-400 dark:text-grayblue-500"
      >
        {capitalizeString(props.name).replaceAll("-", " ")}
      </label>
      <div
        id={labelToId(props.name)}
        className={`${
          isOpened
            ? "bg-neutral-300 dark:bg-grayblue-700"
            : "bg-neutral-100 dark:bg-grayblue-800"
        } outline-none border-2 border-transparent py-3 px-6 flex flex-row items-center justify-between rounded-xl relative transition-colors duration-300 ${
          props.className
        }`}
        onClick={() => setOpened(!isOpened)}
      >
        <span>{props.selectedOption}</span>
        <span>
          <i
            className={`fi fi-rr-angle-small-down inline-block transition-transform duration-300 origin-center ${
              isOpened ? "rotate-180" : "rotate-0"
            }`}
          ></i>
        </span>
        <div
          className={`${
            isOpened ? "scale-y-100" : "scale-y-0"
          } origin-top top-full left-0 pt-2 h-max w-full absolute z-20 transition-transform duration-200 overflow-x-hidden`}
        >
          <div className="bg-white dark:bg-grayblue-800 border border-neutral-200 dark:border-grayblue-600 py-2 rounded-lg flex flex-col gap-1 max-h-44 overflow-y-scroll">
            {props.options.map((opt, index) => (
              <div
                className="px-4 py-1 hover:bg-neutral-100 dark:hover:bg-grayblue-700 cursor-default"
                onClick={() =>
                  props.setSelectedOption(opt.value ? opt.value : opt.name)
                }
                key={index}
              >
                {opt.icon ? (
                  <i
                    className={`fi fi-rr-${opt.icon} inline-block translate-y-0.5 mr-2`}
                  ></i>
                ) : null}
                {opt.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
