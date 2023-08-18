import { Trip } from "../../types/types";
import { capitalizeString } from "../../lib/functions";

function convertDuration(min: number | undefined): string {
  if (min === undefined) {
    return "0";
  }
  if (min < 60) {
    return `${min.toString()}min`;
  }
  return `${Math.floor(min / 60)}h ${min % 60}min`;
}

interface TripDisplayerProps extends Trip {
  showMoreOptBtn?: boolean;
  setModalOpened?: CallableFunction;
}

export function TripDisplayer(props: TripDisplayerProps) {
  const getFormattedDate = (): string => {
    if (props.date) {
      const f = new Date(props.date).toLocaleDateString("fr-FR");
      return f;
    }
    return "";
  };

  return (
    <div className="w-full grid grid-cols-[calc(100%-2rem)_2rem] py-2 px-6 bg-neutral-100 dark:bg-grayblue-800 rounded-xl mb-3">
      <div className="flex flex-col">
        <span
          className="relative w-full font-medium overflow-hidden whitespace-nowrap after:absolute after:w-10 after:h-6 after:right-0 after:bg-gradient-to-r from-neutral-100/0 to-neutral-100 dark:after:from-grayblue-800/0 dark:after:to-grayblue-800"
          title={`From ${capitalizeString(props.from)} to ${capitalizeString(
            props.to
          )}`}
        >
          {capitalizeString(props.from)}
          {props.roundTrip ? (
            <i className="fi fi-rr-exchange inline-block mx-3 translate-y-0.5"></i>
          ) : (
            <i className="fi fi-rr-arrow-right inline-block mx-3 translate-y-0.5"></i>
          )}
          {capitalizeString(props.to)}
        </span>
        <span className="text-grayblue-400">
          {getFormattedDate()} - {props.length}km -{" "}
          {convertDuration(props.duration)}
        </span>
      </div>
      <button
        className={`${
          props.showMoreOptBtn ? "" : "hidden"
        } text-grayblue-500 block py-2 w-full text-right`}
        onClick={() => {
          if (props.setModalOpened) {
            props.setModalOpened(true);
          }
        }}
      >
        <i className="fi fi-rr-menu-dots-vertical"></i>
      </button>
    </div>
  );
}
