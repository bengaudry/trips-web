import { useTranslation } from "react-i18next";
import { Cta, SecondaryText, TripDisplayer } from "../../../../components";
import { StatsData, Trip } from "../../../../types/types";
import { StatPill } from "./StatPill";
import { MAX_KMS_BEFORE_LICENSE } from "../../../../lib/constants";
import { ReachedMaxAlert } from "./ReachedMaxAlert";
import { NavLink } from "react-router-dom";
import { DrivingSteps } from "./DrivingSteps";
import { getFirebaseAuth } from "../../../../../server";
import { getDiffBetweenDates } from "../../../../lib/functions";
import { useState } from "react";
import { PremiumPopup } from "./PremiumPopup";

export function Stats(props: {
  allTrips?: Trip[];
  setPanelFn: CallableFunction;
  data: StatsData;
}) {
  const [premiumPopupVisible, setPremiumPopupVisible] = useState(false);

  const getKmsPercent = (): number => {
    return Math.floor((props.data.totalKms / MAX_KMS_BEFORE_LICENSE) * 100);
  };

  const { t } = useTranslation();
  const { countryside, expressway, highway, city } = props.data.tripsByRoadType;

  const tenDaysInMilliSeconds = 864_000_000;

  const canSeeStats =
    tenDaysInMilliSeconds >=
    getDiffBetweenDates(
      new Date(getFirebaseAuth().currentUser?.metadata.creationTime as string)
    );

  return (
    <div>
      <ReachedMaxAlert />

      <PremiumPopup
        visible={premiumPopupVisible}
        setVisible={setPremiumPopupVisible}
      />

      {props.data.totalKms > 0 && (
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
              <span className="text-grayblue-200 text-lg font-medium">km</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">
                {props.allTrips?.length}
              </span>
              <span className="text-grayblue-200 text-lg font-medium">
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
              <span className="text-grayblue-200 text-lg font-medium">
                {props.data.totalDrivingTime.unit}
              </span>
            </div>
          </div>
        </section>
      )}

      {canSeeStats ? (
        props.data.totalKms > 0 ||
        countryside > 0 ||
        expressway > 0 ||
        highway > 0 ||
        city > 0 ? (
          <section className="grid grid-cols-2 gap-4 my-4">
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
        ) : (
          <SecondaryText className="text-center mt-4">
            <NavLink
              to="/add"
              className="text-brand-500 underline underline-offset-2"
            >
              {t("homepage.addFirstTrip")}
            </NavLink>{" "}
            {t("homepage.stats.seeStatsAppear")}
          </SecondaryText>
        )
      ) : (
        <div className="bg-neutral-100 dark:bg-grayblue-800 p-6 rounded-lg flex flex-col gap-4">
          <SecondaryText>
            Your 10 days of free trial have expired. To see your stats again,
            please
          </SecondaryText>
          <Cta
            type="button"
            color="gradient"
            onClick={() => setPremiumPopupVisible(true)}
          >
            See premium
          </Cta>
        </div>
      )}

      <section className="bg-neutral-100 dark:bg-grayblue-800 flex flex-row justify-between items-start rounded-lg p-4 mt-4 h-44">
        <DrivingSteps kmsPercent={getKmsPercent()} />
      </section>

      <div className="flex flex-row items-center justify-between mt-8 mb-4 ">
        <h2 className="block text-3xl font-semibold">
          {t("homepage.recent.title")}
        </h2>
        <button className="block h-fit" onClick={() => props.setPanelFn(1)}>
          <SecondaryText>{t("common.seeAll")}</SecondaryText>
        </button>
      </div>
      {props.allTrips && props.allTrips.length > 0 ? (
        props.allTrips?.slice(0, 5).map((trip) => {
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
        })
      ) : !navigator.onLine ? (
        <SecondaryText className="text-lg text-center py-5">
          Unable to load your trips,
          <br />
          it appears you are no longer connected to the internet.
        </SecondaryText>
      ) : (
        <div className="text-center">
          <img
            src="/illustrations/empty-list.png"
            alt="An illustration of an empty place..."
            width={300}
            className="block mx-auto"
          />
          <p>{t("homepage.stats.whyWaiting")}</p>
          <NavLink
            to="/add"
            className="text-brand-400 underline underline-offset-2"
          >
            {t("homepage.addFirstTrip")}
          </NavLink>
        </div>
      )}
    </div>
  );
}
