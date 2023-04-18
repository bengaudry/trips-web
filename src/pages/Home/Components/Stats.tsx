import { t } from "i18next";
import { PrettyProgress, TripDisplayer } from "../../../components";
import { StatsData, Trip } from "../../../types/types";
import { StatPill } from "./StatPill";

export function Stats(props: {
  allTrips?: Trip[];
  setPanelFn: CallableFunction;
  data: StatsData
}) {

  const getKmsPercent = (): number => {
    const maximumKms = 3000;
    return Math.floor((props.data.totalKms / maximumKms) * 100);
  };

  return (
    <>
      <h2 className="pt-3 block text-3xl font-semibold">
        {t("homepage.header.statsTitle")}
      </h2>

      <div className="rounded-xl h-max py-6 pb-16 px-8 mt-2 bg-gradient-to-tr from-sky-600 to-indigo-600">
        <div className="grid grid-cols-3 items-center justify-between">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{props.data.totalKms}</span>
            <span className="text-grayblue-200 text-lg">km</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{props.allTrips?.length}</span>
            <span className="text-grayblue-200 text-lg">
              {t(
                props.allTrips && props.allTrips.length > 1
                  ? "common.trips"
                  : "common.trip"
              )}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">
              {props.data.totalDrivingTime.nb}
            </span>
            <span className="text-grayblue-200 text-lg">
              {props.data.totalDrivingTime.unit}
            </span>
          </div>
        </div>

        <PrettyProgress percent={getKmsPercent()} />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <StatPill label="Countryroad" nb={props.data.tripsByRoadType.countryside} />
        <StatPill label="Expressway" nb={props.data.tripsByRoadType.expressway} />
        <StatPill label="Highway" nb={props.data.tripsByRoadType.highway} />
        <StatPill label="City" nb={props.data.tripsByRoadType.city} />
      </div>

      <div className="flex flex-row items-center justify-between mt-8 mb-4 ">
        <h2 className="block text-3xl font-semibold">
          {t("homepage.recent.title")}
        </h2>
        <button
          className="block h-fit text-grayblue-500"
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
  );
}
