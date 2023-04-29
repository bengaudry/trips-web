import { ReactNode, useState } from "react";
import { SelectOption } from "../types";
import { capitalizeString } from "../../../lib/functions";

interface MultiSelectProps {
  name: string;
  className?: string;
  selectedOptions: number[];
  setSelectedOptions: (val: number[]) => void;
  options: SelectOption[];
}

export function MultiSelect(props: MultiSelectProps) {
  const [isOpened, setOpened] = useState(false);

  const labelToId = (label: string) => {
    return label.toLowerCase().replaceAll(" ", "-");
  };

  return (
    <div>
      <div className="flex flex-col">
        <label
          htmlFor={labelToId(props.name)}
          className="mt-4 font-semibold text-neutral-500 dark:text-grayblue-500"
        >
          {capitalizeString(props.name).replaceAll("-", " ")}
        </label>
        <div
          id={labelToId(props.name)}
          className={`${
            isOpened
              ? "bg-neutral-300 dark:bg-grayblue-700"
              : "bg-neutral-200 dark:bg-grayblue-800"
          } outline-none border-2 border-transparent py-3 px-6 flex flex-row items-center justify-between rounded-xl relative transition-colors duration-300 ${
            props.className
          }`}
          onClick={() => setOpened(!isOpened)}
        >
          <span>
            {props.selectedOptions.map((option, index) => {
              if (index in props.selectedOptions) {
                return index + 1 < props.selectedOptions.length
                  ? `${props.options[index].name}, `
                  : props.options[index].name;
              }
            })}
          </span>
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
                  className={`px-4 py-1 flex flex-row items-center justify-between hover:bg-neutral-200 dark:hover:bg-grayblue-700 cursor-default`}
                  onClick={() => {
                    if (props.selectedOptions.includes(index)) {
                      let arr: number[] = [...props.selectedOptions];
                      let newArr = arr.filter((value) => {
                        return index !== value;
                      });
                      props.setSelectedOptions(newArr);
                    } else {
                      let arr: number[] = [...props.selectedOptions];
                      arr.push(index);
                      props.setSelectedOptions(arr);
                    }
                  }}
                  key={index}
                >
                  <div>
                    {opt.icon ? (
                      <i
                        className={`fi fi-rr-${opt.icon} inline-block translate-y-0.5 mr-2`}
                      ></i>
                    ) : null}
                    {opt.name}
                  </div>
                  {props.selectedOptions.includes(index) ? (
                    <i className="fi fi-rr-check"></i>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
