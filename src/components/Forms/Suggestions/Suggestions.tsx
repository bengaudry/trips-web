import { useEffect, useState } from "react";

function Location(props: {
  value: string;
  setSelectedLocation: CallableFunction;
}) {
  return (
    <span
      className="block px-4 py-0.5 text-slate-400 transition-colors duration-100 hover:bg-slate-700 hover:text-white"
      onClick={() => props.setSelectedLocation(props.value)}
    >
      {props.value}
    </span>
  );
}

export function Suggestions(props: {
  location: string;
  onChange: CallableFunction;
  className?: string;
}) {

  return (
    <div
      className={`${props.className} absolute z-30 top-full left-0 w-full h-max pt-2`}
    >
      <div className="bg-slate-800 border border-slate-600 rounded-lg py-2 flex flex-col max-h-44 overflow-y-scroll">
        <span className="px-4 font-semibold">Nearby</span>
        <span className="px-4 font-semibold mt-2">Recent</span>
        <span
          className="block px-4 py-0.5 text-slate-400 transition-colors duration-100 hover:bg-slate-700 hover:text-white"
          onClick={() => { console.log("feurs"); props.onChange("feurs")}}
        >
          Feurs
        </span>
      </div>
    </div>
  );
}
