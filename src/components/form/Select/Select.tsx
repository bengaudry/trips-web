import { ReactNode, useEffect, useState } from "react";

interface Option {
  name: string;
}

interface props {
  name: string;
  className?: string;
  onChange?: CallableFunction;
  options: Option[];
}

function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function Select(props: props) {
  const [isOpened, setOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    props.options[0].name
  );

  useEffect(() => {
    if (props.onChange) {
      props.onChange(selectedOption);
    }
  });

  return (
    <div className="flex flex-col">
      <label htmlFor={props.name} className="mt-4 font-semibold text-neutral-500 dark:text-grayblue-500">
        {capitalizeString(props.name).replaceAll("-", " ")}
      </label>
      <div
        id={props.name}
        className={`${
          isOpened ? "bg-neutral-300 dark:bg-grayblue-700" : "bg-neutral-200 dark:bg-grayblue-800"
        } outline-none border-2 border-transparent py-3 px-6 flex flex-row items-center justify-between rounded-xl relative transition-colors duration-300 ${
          props.className
        }`}
        onClick={() => setOpened(!isOpened)}
      >
        <span>{selectedOption}</span>
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
          <div className="bg-white dark:bg-grayblue-800 border border-neutral-300 dark:border-grayblue-600 py-2 rounded-lg flex flex-col gap-1 max-h-44 overflow-y-scroll">
            {props.options.map((opt, index) => (
              <div
                className="px-4 py-1 hover:bg-neutral-200 dark:hover:bg-grayblue-700 cursor-default"
                onClick={() => setSelectedOption(opt.name)}
                key={index}
              >
                {opt.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
