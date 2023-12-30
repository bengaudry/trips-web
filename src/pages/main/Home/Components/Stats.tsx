import { CurrentUser } from "@/api";
import { Cta, Text, TripDisplayer } from "@/components";
import { MAX_KMS_BEFORE_LICENSE } from "@/lib/constants";
import { StatsData, Trip } from "@/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { DrivingSteps } from "./DrivingSteps";
import { PremiumPopup } from "./PremiumPopup";
import { ReachedMaxAlert } from "./ReachedMaxAlert";
import { StatPill } from "./StatPill";

export function Stats(props: {
  allTrips?: Trip[];
  setPanelFn: CallableFunction;
  data: StatsData;
}) {
  const { t } = useTranslation();
  const [premiumPopupVisible, setPremiumPopupVisible] = useState(false);

  const getKmsPercent = (): number => {
    return Math.floor((props.data.totalKms / MAX_KMS_BEFORE_LICENSE) * 100);
  };

  const { countryside, expressway, highway, city } = props.data.tripsByRoadType;
  
  return (
    <div>
      <ReachedMaxAlert />

      <PremiumPopup
        visible={premiumPopupVisible}
        setVisible={setPremiumPopupVisible}
      />

      <div className="flex flex-col gap-4 pt-2 pb-8">
        {props.data.totalKms > 0 && (
          <section className="rounded-xl h-max py-6 px-8 text-white bg-gradient-to-tr from-sky-600 to-indigo-600">
            <div className="grid grid-cols-3 items-center justify-between">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">
                  {props.data.totalKms >= MAX_KMS_BEFORE_LICENSE
                    ? `${MAX_KMS_BEFORE_LICENSE}+`
                    : props.data.totalKms}
                </span>
                <span className="text-grayblue-200 text-lg font-medium">
                  km
                </span>
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

        {CurrentUser.isPremium() ? (
          props.data.totalKms > 0 ||
          countryside > 0 ||
          expressway > 0 ||
          highway > 0 ||
          city > 0 ? (
            <section className="grid grid-cols-2 gap-4">
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
            <Text.Secondary className="text-center">
              <NavLink
                to="/add"
                className="text-brand-500 underline underline-offset-2"
              >
                {t("homepage.addFirstTrip")}
              </NavLink>{" "}
              {t("homepage.stats.seeStatsAppear")}
            </Text.Secondary>
          )
        ) : (
          <div className="bg-gradient-to-r from-[#DA22FF] to-[#9733EE] p-6 rounded-lg flex flex-col gap-4">
            <p className="text-lg text-white">
              Your 10 days of free trial have expired. To see your stats again,
              please
            </p>
            <Cta
              type="button"
              color="white"
              onClick={() => setPremiumPopupVisible(true)}
            >
              See premium
            </Cta>
          </div>
        )}

        <section className="bg-neutral-100 dark:bg-grayblue-800 flex flex-row justify-between items-start rounded-lg p-4 h-44">
          <DrivingSteps kmsPercent={getKmsPercent()} />
        </section>
      </div>

      <div className="flex flex-row items-center justify-between mb-4 ">
        <Text.Title rank={2} className="block">
          {t("homepage.recent.title")}
        </Text.Title>
        <button className="block h-fit" onClick={() => props.setPanelFn(1)}>
          <Text.Secondary>{t("common.seeAll")}</Text.Secondary>
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
        <Text.Secondary className="text-lg text-center py-5">
          Unable to load your trips,
          <br />
          it appears you are no longer connected to the internet.
        </Text.Secondary>
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
