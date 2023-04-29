import { NotVerifiedEmailPopup, TabSlider } from "../../components";
import { Trips } from "./Components/Trips";
import { useEffect, useMemo, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { getFirebaseApp, getFirebaseAuth } from "../../../server";
import { StatsData, Trip } from "../../types/types";
import { useTranslation } from "react-i18next";
import { Stats } from "./Components/Stats";

export function Home() {
  const [trips, setTrips] = useState<Trip[]>();
  const { t } = useTranslation();
  const [currentPanel, setCurrentPanel] = useState<0 | 1>(0);

  const calculateDataForStats = (): StatsData => {
    // Define a basic object to return
    let r: StatsData = {
      totalKms: 0,
      totalDrivingTime: {
        nb: 0,
        unit: "hrs",
      },
      tripsByRoadType: {
        countryside: 0,
        expressway: 0,
        highway: 0,
        city: 0,
      },
    };

    // Initialize a default duration of 0 minutes
    // that will be increased in the map()
    let mins = 0;

    // Map the object trips only once
    trips?.map((trip) => {
      // Calculate the nb of kilometers of this trip
      // and add it to the default value
      if (!isNaN(trip.length)) {
        r.totalKms += trip.roundTrip ? trip.length * 2 : trip.length;
      }

      // Calculate the duration of this trip
      // and add it to the default value
      if (!isNaN(trip.duration)) {
        mins += trip.roundTrip ? trip.duration * 2 : trip.duration;
      }

      // Increase the number of trips by category
      if (trip.roadType === "Countryroad") {
        r.tripsByRoadType.countryside++;
      } else if (trip.roadType === "Expressway") {
        r.tripsByRoadType.expressway++;
      } else if (trip.roadType === "Highway") {
        r.tripsByRoadType.highway++;
      } else if (trip.roadType === "City") {
        r.tripsByRoadType.city++;
      }
    });

    // Convert minutes to hours if necessary
    if (mins >= 60) {
      r.totalDrivingTime = { nb: Math.floor(mins / 60), unit: "hrs" };
    } else {
      r.totalDrivingTime = { nb: Math.floor(mins), unit: "min" };
    }

    return r;
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
            }))
          );
        })
        .catch((err) => console.error(`Error while fetching data : ${err}`));
    };

    fetchData();
  }, []);

  const memoizedData = useMemo(() => trips, [trips]);
  const allTrips = memoizedData ? memoizedData : trips ? trips : [];

  return (
    <>
      <div className="px-5 py-16">
        <NotVerifiedEmailPopup className="mb-4" />
        <p className="text-neutral-500 dark:text-grayblue-400 text-xl mt-1">
          {t("homepage.header.subtitle")}
        </p>
        <h1 className="text-4xl font-bold">
          {getFirebaseAuth().currentUser?.displayName
            ? `${getFirebaseAuth().currentUser?.displayName} 👋`
            : ""}
        </h1>

        <div className="dark:bg-grayblue-900/90 backdrop-blur-lg sticky z-20 top-0 py-3">
          <TabSlider
            tabs={[t("homepage.slider.stats"), t("homepage.slider.trips")]}
            current={currentPanel}
            onChange={(val: 0 | 1) => setCurrentPanel(val)}
          />
        </div>

        {currentPanel === 0 ? (
          <Stats
            allTrips={allTrips}
            setPanelFn={setCurrentPanel}
            data={calculateDataForStats()}
          />
        ) : (
          <Trips data={memoizedData} />
        )}
      </div>
    </>
  );
}
