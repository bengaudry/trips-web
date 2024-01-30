import { SelectOption } from "../types";
import { Text } from "@/components/texts";

interface MultiSelectProps {
  name: string;
  multi?: boolean;
  className?: string;
  selectedOptions: number[];
  setSelectedOptions: (val: number[]) => void;
  options: SelectOption[];
}

export function Select(props: MultiSelectProps) {
  const { selectedOptions, setSelectedOptions } = props;

  const handleOptionClick = (index: number) => {
    if (props.multi) {
      // Multi selection
      if (!selectedOptions.includes(index)) {
        // Adding option to selected options array
        setSelectedOptions([...selectedOptions, index]);
      } else {
        // Removing option to selected options array
        const newSelected = [...selectedOptions];
        setSelectedOptions(newSelected.filter((element) => element !== index));
      }
    } else {
      // Single selection
      setSelectedOptions([index]);
    }
  };

  return (
    <div className={props.className}>
      <Text.Secondary className="font-medium">{props.name}</Text.Secondary>
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
              scrollSnapAlign: index === 0 ? "start" : "end",
            }}
            className={`grid place-content-center py-6 border-2 rounded-lg transition-colors text-black dark:text-grayblue-100 ${
              selectedOptions.includes(index)
                ? " md:md:hover:bg-neutral-100 border-brand-300 dark:border-brand-500 bg-brand-100/10 text-brand-500 md:dark:md:hover:bg-brand-500/10 dark:bg-brand-500/10"
                : "border-neutral-100 md:md:hover:bg-neutral-100 dark:border-grayblue-800 md:dark:md:hover:bg-grayblue-800"
            }`}
            onClick={() => handleOptionClick(index)}
            key={index}
          >
            {opt.icon && (
              <i
                className={`fi fi-rr-${opt.icon} ${
                  opt.iconColor ? `text-${opt.iconColor}` : ""
                }`}
              />
            )}
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  );
}
