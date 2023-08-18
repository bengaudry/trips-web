import { useEffect, useMemo, useState } from "react";
import { t } from "i18next";

import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { getFirebaseApp, getFirebaseAuth } from "../../../server";

import { Trip } from "../../types/types";
import { calculateDataForStats } from "../../lib/functions";

import {
  NotVerifiedEmailPopup,
  PageLayout,
  PanelSwitcher,
} from "../../components";
import { Trips } from "./Components/Trips";
import { Stats } from "./Components/Stats";

export function Home() {
  const [trips, setTrips] = useState<Trip[]>();
  const [currentPanel, setCurrentPanel] = useState<0 | 1>(0);

  const changePanel = (val: number) => {
    if (val === 0 || val === 1) {
      setCurrentPanel(val);
    }
  };

  useEffect(() => {
    const db = getFirestore(getFirebaseApp());
    const tripsCollection = collection(db, "/trips");

    const fetchData = async () => {
      let q = query(
        tripsCollection,
        where("uid", "==", getFirebaseAuth().currentUser?.uid),
        orderBy("date", "desc")
      );
      await getDocs(q)
        .then((val) => {
          setTrips(
            val.docs.map((doc, index) => ({
              ...(doc.data() as Trip),
              id: doc.id,
              key: index,
            }))
          );
        })
        .catch((err) => console.error(`Error while fetching data : ${err}`));
    };

    fetchData();
  }, []);

  // Scroll to top when panel changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPanel]);

  const memoizedData = useMemo(() => trips, [trips]);
  const allTrips = memoizedData ? memoizedData : trips ? trips : [];

  return (
    <>
      <PageLayout className="overflow-y-scroll">
        <NotVerifiedEmailPopup className="mb-4" />

        <p className="text-neutral-400 dark:text-grayblue-400 text-xl mt-1">
          {t("homepage.header.subtitle")}
        </p>

        <h1 className="text-4xl font-bold">
          {getFirebaseAuth().currentUser?.displayName
            ? `${getFirebaseAuth().currentUser?.displayName} 👋`
            : ""}
        </h1>

        <div className="dark:bg-grayblue-900/90 backdrop-blur-lg sticky z-20 top-0 py-3">
          <PanelSwitcher
            tabs={[t("homepage.slider.stats"), t("homepage.slider.trips")]}
            current={currentPanel}
            onChange={(val) => changePanel(val)}
          />
        </div>

        {currentPanel === 0 ? (
          <Stats
            allTrips={allTrips}
            setPanelFn={setCurrentPanel}
            data={calculateDataForStats(trips)}
          />
        ) : (
          <Trips data={memoizedData} />
        )}
      </PageLayout>
    </>
  );
}
