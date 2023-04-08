import { TabSlider } from "../../components";
import { Trips } from "./Components/Trips";
import { useEffect, useMemo, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { getFirebaseApp, getFirebaseAuth } from "../../../server";
import { Trip } from "../../types/types";
import { useTranslation } from "react-i18next";
import { Stats } from "./Components/Stats";

export function Home() {
  const [trips, setTrips] = useState<Trip[]>();
  const { t } = useTranslation();
  const [currentPanel, setCurrentPanel] = useState<0 | 1>(0);

  useEffect(() => {
    const db = getFirestore(getFirebaseApp());
    const tripsCollection = collection(db, "/trips");

    const fetchData = async () => {
      let q = query(
        tripsCollection,
        where("uid", "==", getFirebaseAuth().currentUser?.uid)
      );
      const response = await getDocs(q);
      const newData = response.docs.map((doc, index) => ({
        date: doc.data().date,
        duration: doc.data().duration,
        from: doc.data().from,
        id: doc.id,
        key: index,
        length: doc.data().length,
        roadType: doc.data().roadType,
        roundTrip: doc.data().roundTrip,
        time: doc.data().time,
        to: doc.data().to,
        trafficDensity: doc.data().trafficDensity,
        weather: doc.data().weather,
      }));
      setTrips(newData);
    };

    fetchData();
  }, []);

  const memoizedData = useMemo(() => trips, [trips]);
  const allTrips = memoizedData ? memoizedData : trips ? trips : [];

  return (
    <>
      <div className="px-5 py-16">
        <p className="text-grayblue-400 text-xl mt-1">
          {t("homepage.header.subtitle")}
        </p>
        <h1 className="text-4xl font-bold mb-6">
          {getFirebaseAuth().currentUser?.displayName
            ? `${getFirebaseAuth().currentUser?.displayName} 👋`
            : ""}
        </h1>

        <TabSlider
          tabs={["Stats", "Trips"]}
          current={currentPanel}
          onChange={(val: 0 | 1) => setCurrentPanel(val)}
          className="mb-6"
        />

        {currentPanel === 0 ? (
          <Stats allTrips={allTrips} setPanelFn={setCurrentPanel} />
        ) : (
          <Trips data={memoizedData} />
        )}
      </div>
    </>
  );
}
