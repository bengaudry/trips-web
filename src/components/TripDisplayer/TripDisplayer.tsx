export type Trip = {
  from: string;
  to: string;
  date: string;
  length: string;
  duration: string;
};

function capitalizeWord(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function convertDuration(min: number): string {
  if (min < 60) {
    return min.toString();
  }
  return `${min / 60}h ${min % 60}min`;
}

export function TripDisplayer(props: Trip) {
  return (
    <div className="w-full flex flex-row items-center py-2 px-6 bg-slate-800 rounded-xl mb-3">
      <div className="flex flex-col">
        <span className="font-semibold">
          {capitalizeWord(props.from)} → {capitalizeWord(props.to)}
        </span>
        <span className="text-slate-400">
          {props.date} - {props.length}km -{" "}
          {props.duration}min
        </span>
      </div>
    </div>
  );
}
