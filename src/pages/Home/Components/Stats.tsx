import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CenteredPopup, TripDisplayer } from "../../../components";
import { StatsData, Trip } from "../../../types/types";
import { StatPill } from "./StatPill";
import { MAX_KMS_BEFORE_LICENSE } from "../../../lib/constants";

export function Stats(props: {
  allTrips?: Trip[];
  setPanelFn: CallableFunction;
  data: StatsData;
}) {
  const [congratsPopupVisible, setCongratsPopupVisible] = useState(false);

  useEffect(() => {
    setCongratsPopupVisible(props.data.totalKms >= MAX_KMS_BEFORE_LICENSE);
  }, [props.data]);

  const getKmsPercent = (): number => {
    return Math.floor((props.data.totalKms / MAX_KMS_BEFORE_LICENSE) * 100);
  };

  const { t } = useTranslation();

  return (
    <>
      <CenteredPopup
        visible={congratsPopupVisible}
        setVisible={setCongratsPopupVisible}
      >
        <span className="text-5xl block mb-2">🎉</span>
        <h2 className="text-2xl font-bold mb-2">
          {t("homepage.stats.congratsPopup.title")}
        </h2>
        <p className="text-grayblue-500 text-lg">
          {t("homepage.stats.congratsPopup.subtitle")}
        </p>
        <h2 className="text-2xl font-bold mb-2 mt-6">
          {t("homepage.stats.congratsPopup.tipsTitle")}
        </h2>
        <p className="text-grayblue-500 text-lg">
          {t("homepage.stats.congratsPopup.tipsParagraph")}
        </p>
      </CenteredPopup>
      <section className="rounded-xl h-max py-6 px-8 mt-2 text-white bg-gradient-to-tr from-sky-600 to-indigo-600">
        <div className="grid grid-cols-3 items-center justify-between">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">
              {props.data.totalKms > MAX_KMS_BEFORE_LICENSE
                ? `${MAX_KMS_BEFORE_LICENSE}+`
                : props.data.totalKms === MAX_KMS_BEFORE_LICENSE
                ? MAX_KMS_BEFORE_LICENSE
                : props.data.totalKms}
            </span>
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
      </section>

      <section className="grid grid-cols-2 gap-4 mt-4">
        <StatPill
          label={t("common.roadTypes.countryroad")}
          nb={props.data.tripsByRoadType.countryside}
        />
        <StatPill
          label={t("common.roadTypes.expressway")}
          nb={props.data.tripsByRoadType.expressway}
        />
        <StatPill
          label={t("common.roadTypes.highway")}
          nb={props.data.tripsByRoadType.highway}
        />
        <StatPill
          label={t("common.roadTypes.city")}
          nb={props.data.tripsByRoadType.city}
        />
      </section>

      <section className="bg-neutral-200 dark:bg-grayblue-800 flex flex-row justify-between items-start rounded-lg p-4 mt-4 h-44">
        <div className="flex flex-row h-full gap-1.5">
          <div className="w-1 rounded-full h-full bg-grayblue-600 overflow-hidden">
            <div
              className="w-full h-full bg-brand-300 rounded-full transition-transform origin-top"
              style={{ transform: `scaleY(${getKmsPercent()}%)` }}
            ></div>
          </div>
          <main className="flex flex-col justify-between h-full">
            <div className="flex flex-row items-center gap-2">
              <span className="inline-block w-12 sm:w-16 text-center font-semibold text-md sm:text-xl bg-white rounded-full text-grayblue-900">
                0
              </span>
              <span className="font-semibold text-md sm:text-lg">
                Rdv préalable
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="inline-block w-12 sm:w-16 text-center font-semibold text-md sm:text-xl bg-white rounded-full text-grayblue-900">
                {MAX_KMS_BEFORE_LICENSE / 2}
              </span>
              <span className="font-semibold text-md sm:text-lg">1er rdv</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="inline-block w-12 sm:w-16 text-center font-semibold text-md sm:text-xl bg-white rounded-full text-grayblue-900">
                {MAX_KMS_BEFORE_LICENSE}
              </span>
              <span className="font-semibold text-md sm:text-lg">Permis</span>
            </div>
          </main>
        </div>

        <div className="h-full w-fit rounded-lg p-5 md:p-6 bg-grayblue-600">
          <p className="font-semibold text-md sm:text-lg text-neutral-400">
            Prochain rdv
          </p>
          <p className="text-3xl font-bold break-words">
            {getKmsPercent() === 0
              ? "Rendez-vous préalable"
              : getKmsPercent() <= 50
              ? "1er rendez-vous"
              : "Permis"}
          </p>
        </div>
      </section>

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
