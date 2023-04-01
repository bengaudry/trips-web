import { useEffect, useState } from "react";

export function TabSlider(props: {
  tabs: string[];
  onChange: CallableFunction;
  current: number;
  className?: string;
}) {
  
  return (
    <div
      className={`grid relative p-1 py-1.5 bg-grayblue-800 rounded-lg overflow-hidden ${props.className}`}
      style={{ gridTemplateColumns: `repeat(${props.tabs.length}, 1fr)` }}
    >
      <div
        className={`absolute left-1 top-1 bg-grayblue-700 h-[calc(100%-0.5rem)] rounded-md transition-transform duration-300 origin-left`}
        style={{
          width: `calc(100% / ${props.tabs.length} - 0.25rem)`,
          transform: `translateX(${props.current * 100}%)`,
        }}
      ></div>
      {props.tabs.map((tab, index) => (
        <div
          className={`text-center w-full z-20`}
          onClick={() => {
            props.onChange(index);
          }}
          key={index}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
