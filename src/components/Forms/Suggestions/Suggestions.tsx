import { ReactNode, useEffect, useState } from "react";

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

export function Suggestions(props: { onLocationChange?: CallableFunction }) {
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  useEffect(() => {
    if (props.onLocationChange) {
      props.onLocationChange(selectedLocation);
    }
  })

  return (
    <div className="absolute z-30 top-full left-0 w-full h-max pt-2">
      <div className="bg-slate-800 border border-slate-600 rounded-lg py-2 flex flex-col max-h-44 overflow-y-scroll">
        <span className="px-4 font-semibold">Nearby</span>
        <Location setSelectedLocation={setSelectedLocation} value="Feurs" />
        <span className="px-4 font-semibold mt-2">Recent</span>
        <Location setSelectedLocation={setSelectedLocation} value="Essertines en donzy" />
        <Location setSelectedLocation={setSelectedLocation} value="Saint galmier" />
        <Location setSelectedLocation={setSelectedLocation} value="Veauche" />
        <Location setSelectedLocation={setSelectedLocation} value="Saint etienne" />
      </div>
    </div>
  );
}
