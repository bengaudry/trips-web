import { CurrentUser } from "@/api";
import { TripDisplayer } from "@/components";
import { MAX_KMS_BEFORE_LICENSE } from "@/lib/constants";
import { StatsData, Trip } from "@/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DrivingSteps } from "../DrivingSteps";
import { PremiumPopup } from "../PremiumPopup";
import { ReachedMaxAlert } from "../ReachedMaxAlert";
import { StatPill } from "../StatPill";
import {
  AddFirstTripSection,
  GradientTopSection,
  NoTripsWarning,
  OfflineTripsWarning,
  PremiumTrialExpiredSection,
  RecentTripsHeader,
} from "./components";

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
          <GradientTopSection
            tripsNb={props.allTrips ? props.allTrips.length : 0}
            totalKms={props.data.totalKms}
            totalDrivingTime={props.data.totalDrivingTime}
          />
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
            <AddFirstTripSection />
          )
        ) : (
          <PremiumTrialExpiredSection
            onSeePremium={() => setPremiumPopupVisible(true)}
          />
        )}

        <section className="bg-neutral-100 dark:bg-grayblue-800 flex flex-row justify-between items-start rounded-lg p-4 h-44">
          <DrivingSteps kmsPercent={getKmsPercent()} />
        </section>
      </div>

      <RecentTripsHeader onSeeAll={() => props.setPanelFn(1)} />

      {props.allTrips && props.allTrips.length > 0 ? (
        props.allTrips.slice(0, 5).map((trip) => {
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
        <OfflineTripsWarning />
      ) : (
        <NoTripsWarning />
      )}
    </div>
  );
}
