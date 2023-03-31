import { useEffect, useState } from "react";

export function TabSlider(props: {
  tabs: string[];
  onChange?: CallableFunction;
  className?: string;
}) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div
      className={`grid relative p-1 bg-grayblue-800 rounded-lg overflow-hidden ${props.className}`}
      style={{ gridTemplateColumns: `repeat(${props.tabs.length}, 1fr)` }}
    >
      <div
        className={`absolute bg-grayblue-700 h-full rounded-lg transition-[left] duration-300`}
        style={{
          width: `calc(100% / ${props.tabs.length})`,
          left: `${(selectedTab / props.tabs.length) * 100}%`,
        }}
      ></div>
      {props.tabs.map((tab, index) => (
        <div
          className=" text-center w-full z-20"
          onClick={() => {
            setSelectedTab(index);
            if (props.onChange) {
              props.onChange(index);
            }
          }}
          key={index}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
