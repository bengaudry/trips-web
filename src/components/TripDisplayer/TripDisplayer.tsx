import { ShortTrip } from "../../types/types";

function capitalizeWord(str: string | undefined) {
  if (str) return (str.charAt(0).toUpperCase() + str.slice(1));
  else return ""
}

function convertDuration(min: number): string {
  if (min < 60) {
    return `${min.toString()}min`;
  }
  return `${Math.floor(min / 60)}h ${min % 60}min`;
}

export function TripDisplayer(props: ShortTrip) {
  return (
    <div className="w-full flex flex-row items-center py-2 px-6 bg-slate-800 rounded-xl mb-3">
      <div className="flex flex-col">
        <span className="font-semibold">
          {capitalizeWord(props.from)}
          {props.roundTrip ? (
            <i className="fi fi-rr-exchange inline-block mx-3 translate-y-0.5"></i>
          ) : (
            <i className="fi fi-rr-arrow-right inline-block mx-3 translate-y-0.5"></i>
          )}
          {capitalizeWord(props.to)}
        </span>
        <span className="text-slate-400">
          {props.date} - {props.length}km - {convertDuration(props.duration)}
        </span>
      </div>
    </div>
  );
}
