import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { getFirebaseApp, getFirebaseAuth } from "../../../../server";

import { Trip } from "../../../types/types";
import { calculateDataForStats } from "../../../lib/functions";

import {
  Modal,
  NotVerifiedEmailPopup,
  PageLayout,
  PanelSwitcher,
  Text,
} from "../../../components";
import { Trips } from "./Components/Trips";
import { Stats } from "./Components/Stats";
import { SetUserNameModal } from "./Components/SetUserNameModal";

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

  const displayName = getFirebaseAuth().currentUser?.displayName;
  const [userNameUnset, setUserNameUnset] = useState(!displayName);

  const changePanel = (val: number) => {
    if (val === 0 || val === 1) {
      setCurrentPanel(val);
    }
  };

  // Fetches user data from firebase
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
    <>
      <PageLayout className="overflow-y-scroll">
        <NotVerifiedEmailPopup className="mb-4" />

        <Text.Secondary className="text-xl mt-1">
          {t("homepage.header.subtitle")}
        </Text.Secondary>

        {userNameUnset && (
          <Modal
            visible={userNameUnset}
            title="Hey ! We haven't met yet"
            unClosable
          >
            <SetUserNameModal setUserNameUnset={setUserNameUnset} />
          </Modal>
        )}

        <Text.Title>
          {getFirebaseAuth().currentUser?.displayName
            ? `${getFirebaseAuth().currentUser?.displayName} 👋`
            : ""}
        </Text.Title>

        <Text.Title>This is H1</Text.Title>
        <Text.Title rank={2}>This is H2</Text.Title>
        <Text.Title rank={3}>This is H3</Text.Title>

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
          <Trips
            data={memoizedData}
            onDataChange={(newData) => {
              setTrips(newData);
            }}
          />
        )}
      </PageLayout>
    </>
  );
}
