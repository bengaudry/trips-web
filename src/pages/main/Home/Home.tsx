import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { getFirebaseDb } from "../../../../server";

import { Trip } from "../../../types/types";
import { calculateDataForStats } from "../../../lib/functions";

import {
  Cta,
  Modal,
  NotVerifiedEmailPopup,
  PageLayout,
  PanelSwitcher,
  Text,
} from "components";
import { Trips } from "./Components/Trips";
import { Stats } from "./Components/Stats";
import { SetUserNameModal } from "./Components/SetUserNameModal";
import { CurrentUser } from "api";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { transform } from "@babel/core";

function fetchCachedTrips() {
  const data = localStorage.getItem("cached-trips-data");
  if (data && JSON.parse(data)) {
    return JSON.parse(data) as Trip[];
  }
  return undefined;
}

function setTripsInCache(data?: Trip[]) {
  if (data) {
    const trips = JSON.stringify(data);
    localStorage.setItem("cached-trips-data", trips);
  }
}

export function Home() {
  const { t } = useTranslation();

  const [trips, setTrips] = useState<Trip[] | undefined>(fetchCachedTrips());
  const [currentPanel, setCurrentPanel] = useState<0 | 1>(0);

  const [userNameUnset, setUserNameUnset] = useState(
    !CurrentUser.getDisplayName()
  );

  const changePanel = (val: number) => {
    if (val === 0 || val === 1) {
      setCurrentPanel(val);
    }
  };

  // Fetches user data from firebase
  useEffect(() => {
    const tripsCollection = collection(getFirebaseDb(), "/trips");

    const fetchData = async () => {
      let q = query(
        tripsCollection,
        where("uid", "==", CurrentUser.getUid()),
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

  // Caches the fetched trips
  useEffect(() => {
    setTripsInCache(trips);
  }, [trips]);

  // Scroll to top when panel changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPanel]);

  const memoizedData = useMemo(() => trips, [trips]);
  const allTrips = memoizedData ? memoizedData : trips ? trips : [];

  return (
    <motion.div
      key="home"
      initial={{ transform: "translateX(-50%)", opacity: 0 }}
      animate={{ transform: "translateX(0)", opacity: 1 }}
      exit={{ transform: "translateX(-50%)", opacity: 0 }}
    >
      <PageLayout>
        <NotVerifiedEmailPopup className="mb-4" />

        {userNameUnset && (
          <Modal
            visible={userNameUnset}
            title="Hey ! We haven't met yet"
            unClosable
          >
            <SetUserNameModal setUserNameUnset={setUserNameUnset} />
          </Modal>
        )}

        <div className="flex flex-row justify-between w-full items-center">
          <div>
            <Text.Secondary className="text-xl mt-1">
              {t("homepage.header.subtitle")}
            </Text.Secondary>
            <Text.Title>
              {CurrentUser.getDisplayName() &&
                `${CurrentUser.getDisplayName()} 👋`}
            </Text.Title>
          </div>
          <Link
            className="bg-gradient-to-br from-gray-400 to-gray-600 w-12 h-12 aspect-square rounded-full grid place-content-center overflow-hidden"
            to="/settings"
          >
            <i className="fi fi-rr-user text-3xl opacity-50 translate-y-1" />
          </Link>
        </div>

        <div className="dark:bg-grayblue-900/90 backdrop-blur-lg sticky z-20 top-0 py-3">
          <PanelSwitcher
            tabs={[t("homepage.slider.stats"), t("homepage.slider.trips")]}
            current={currentPanel}
            onChange={(val) => changePanel(val)}
          />
        </div>

        <div className="overflow-x-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            {currentPanel === 0 ? (
              <motion.div
                key={currentPanel}
                initial={{ transform: "translateX(-50%)", opacity: 0 }}
                animate={{ transform: "translateX(0)", opacity: 1 }}
                exit={{ transform: "translateX(-50%)", opacity: 0 }}
              >
                <Stats
                  allTrips={allTrips}
                  setPanelFn={setCurrentPanel}
                  data={calculateDataForStats(trips)}
                />
              </motion.div>
            ) : (
              <motion.div
                key={currentPanel}
                initial={{ transform: "translateX(50%)", opacity: 0 }}
                animate={{ transform: "translateX(0)", opacity: 1 }}
                exit={{ transform: "translateX(50%)", opacity: 0 }}
              >
                <Trips
                  data={memoizedData}
                  onDataChange={(newData) => {
                    setTrips(newData);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PageLayout>
      <button className="fixed top- bg-brand-500 w-12 h-12 rounded-full">
        <i className="fi fi-rr-plus text-2xl translate-y-0.5" />
      </button>
    </motion.div>
  );
}
