import { useState } from "react";
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
  const { selectedOptions, setSelectedOptions } = props;

  const [isOpened, setOpened] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const labelToId = (label: string) => {
    return label.toLowerCase().replaceAll(" ", "-");
  };

  const handleOptionClick = (index: number) => {
    if (!selectedOptions.includes(index)) {
      // Adding option to selected options array
      setSelectedOptions([...selectedOptions, index]);
    } else {
      // Removing option to selected options array
      const newSelected = [...selectedOptions];
      setSelectedOptions(newSelected.filter((element) => element !== index));
    }
  };

  return (
    <div className={props.className}>
      <p className="text-neutral-400 font-medium">{props.name}</p>
      <div
        role="container"
        style={{
          gridTemplateColumns: `repeat(${props.options.length}, 120px)`,
          scrollSnapType: "x mandatory",
          scrollSnapStop: "always",
        }}
        className="grid grid-cols-4 overflow-x-scroll gap-5 pb-4"
      >
        {props.options.map((opt, index) => (
          <button
            type="button"
            style={{
              scrollSnapAlign: "end",
            }}
            className={`grid place-content-center aspect-square border-2 rounded-lg transition-colors duration-300 ${
              selectedOptions.includes(index)
                ? "bg-brand-200 border-brand-600 text-white"
                : "bg-transparent border-neutral-100 hover:border-neutral-400"
            }`}
            onClick={() => handleOptionClick(index)}
            key={index}
          >
            {opt.name}
            {opt.icon ? <i className={`fi fi-rr-${opt.icon}`}></i> : ""}
          </button>
        ))}
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <div className="flex flex-col">
  //       <label
  //         htmlFor={labelToId(props.name)}
  //         className="mt-4 font-medium text-neutral-400 dark:text-grayblue-500"
  //       >
  //         {capitalizeString(props.name).replaceAll("-", " ")}
  //       </label>
  //       <div
  //         id={labelToId(props.name)}
  //         className={`${
  //           isOpened
  //             ? "bg-neutral-300 dark:bg-grayblue-700"
  //             : "bg-neutral-100 dark:bg-grayblue-800"
  //         } outline-none border-2 border-transparent py-3 px-6 flex flex-row items-center justify-between rounded-xl relative transition-colors duration-300 ${
  //           props.className
  //         }`}
  //         onClick={() => setOpened(!isOpened)}
  //       >
  //         <span>
  //           {[...props.selectedOptions].map((option, index) => {
  //             if (props.selectedOptions.includes(index)) {
  //               return index + 1 < props.selectedOptions.length
  //                 ? `${props.options[index].name}, `
  //                 : props.options[index].name;
  //             }
  //           })}
  //         </span>
  //         <span>
  //           <i
  //             className={`fi fi-rr-angle-small-down inline-block transition-transform duration-300 origin-center ${
  //               isOpened ? "rotate-180" : "rotate-0"
  //             }`}
  //           ></i>
  //         </span>
  //         <div
  //           className={`${
  //             isOpened ? "scale-y-100" : "scale-y-0"
  //           } origin-top top-full left-0 pt-2 h-max w-full absolute z-20 transition-transform duration-200 overflow-x-hidden`}
  //         >
  //           <div className="bg-white dark:bg-grayblue-800 border border-neutral-200 dark:border-grayblue-600 py-2 rounded-lg flex flex-col gap-1 max-h-44 overflow-y-scroll">
  //             {props.options.map((opt, index) => (
  //               <div
  //                 className={`px-4 py-1 flex flex-row items-center justify-between hover:bg-neutral-100 dark:hover:bg-grayblue-700 cursor-default`}
  //                 onClick={() => {
  //                   if (props.selectedOptions.includes(index)) {
  //                     // Remove an element from selected list
  //                     let arr: number[] = [...props.selectedOptions];
  //                     let newArr = arr.filter((value, id) => {
  //                       return index !== id;
  //                     });
  //                     props.setSelectedOptions(newArr);
  //                   } else {
  //                     // Add an element to selected list
  //                     let arr: number[] = [...props.selectedOptions];
  //                     arr.push(index);
  //                     props.setSelectedOptions(arr);
  //                   }
  //                 }}
  //                 key={index}
  //               >
  //                 <div>
  //                   {opt.icon ? (
  //                     <i
  //                       className={`fi fi-rr-${opt.icon} inline-block translate-y-0.5 mr-2`}
  //                     ></i>
  //                   ) : null}
  //                   {opt.name}
  //                 </div>
  //                 {props.selectedOptions.includes(index) ? (
  //                   <i className="fi fi-rr-check"></i>
  //                 ) : (
  //                   <></>
  //                 )}
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
