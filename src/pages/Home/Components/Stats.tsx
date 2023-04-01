import { t } from "i18next";
import { PrettyProgress, TripDisplayer } from "../../../components";
import { Trip } from "../../../types/types";

export function Stats (props: { allTrips?: Trip[], setPanelFn: CallableFunction }) {

  const getTotalKms = (): number => {
    let kms = 0;
    props.allTrips?.map(
      (trip) => (kms += trip.roundTrip ? trip.length * 2 : trip.length)
    );
    return props.allTrips ? kms : 0;
  };

  const getKmsPercent = (): number => {
    const maximumKms = 3000;
    return props.allTrips ? Math.floor((getTotalKms() / maximumKms) * 100) : 0;
  };

  const getTotalDrivingTime = (): { nb: number; unit: "min" | "hrs" } => {
    let mins = 0;
    props.allTrips?.map(
      (trip: Trip) =>
        (mins += trip.roundTrip ? trip.duration * 2 : trip.duration)
    );
    return mins >= 60
      ? { nb: Math.floor(mins / 60), unit: "hrs" }
      : { nb: Math.floor(mins), unit: "min" };
  };
  return <>
  <h2 className="block text-3xl font-semibold">
    {t("homepage.header.statsTitle")}
  </h2>
  <div className="bg-grayblue-800 rounded-xl h-max py-6 px-8 mt-2 border border-grayblue-600">
    <div className="grid grid-cols-3 items-center justify-between">
      <div className="flex flex-col items-center">
        <span className="text-brand-500 text-3xl font-bold">
          {getTotalKms()}
        </span>
        <span className="text-grayblue-400 text-lg">km</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-brand-500 text-3xl font-bold">
          {props.allTrips?.length}
        </span>
        <span className="text-grayblue-400 text-lg">
          {t(
            props.allTrips && props.allTrips.length > 1 ? "common.trips" : "common.trip"
          )}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-brand-500 text-3xl font-bold">
          {getTotalDrivingTime().nb}
        </span>
        <span className="text-grayblue-400 text-lg">
          {getTotalDrivingTime().unit}
        </span>
      </div>
    </div>

    <PrettyProgress percent={getKmsPercent()} />
  </div>

  <div className="flex flex-row items-center justify-between mt-8 mb-4 ">
    <h2 className="block text-3xl font-semibold">
      {t("homepage.recent.title")}
    </h2>
    <button
      className="block h-fit text-neutral-400"
      onClick={() => props.setPanelFn(1)}
    >
      {t("common.seeAll")}
    </button>
  </div>
  {props.allTrips?.slice(0, 5).map((trip) => {
    return (
      <TripDisplayer
        from={trip.from}
        to={trip.to}
        date={trip.date}
        length={trip.length}
        roundTrip={trip.roundTrip}
        duration={trip.duration}
        key={trip.key}
      />
    );
  })}
</>
}