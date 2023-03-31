import { User } from "firebase/auth";
import { TripDisplayer, SlidingPage, PrettyProgress } from "../../components";
import { Trips } from "./Components";
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

export function Home(props: { user: User }) {
  const [tripsPanelOpened, setTripsPanelOpened] = useState<boolean>(false);
  const [trips, setTrips] = useState<Trip[]>();
  const { t } = useTranslation();

  useEffect(() => {
    const db = getFirestore(getFirebaseApp());
    const tripsCollection = collection(db, "/trips");

    const fetchData = async () => {
      let q = query(tripsCollection, where("uid", "==", props.user.uid));
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

  const getTotalKms = (): number => {
    let kms = 0;
    trips?.map(
      (trip) => (kms += trip.roundTrip ? trip.length * 2 : trip.length)
    );
    return trips ? kms : 0;
  };

  const getKmsPercent = (): number => {
    const maximumKms = 3000;
    return trips ? Math.floor((getTotalKms() / maximumKms) * 100) : 0;
  };

  const getTotalDrivingTime = (): { nb: number; unit: "min" | "hrs" } => {
    let mins = 0;
    trips?.map(
      (trip: Trip) =>
        (mins += trip.roundTrip ? trip.duration * 2 : trip.duration)
    );
    return mins >= 60
      ? { nb: Math.floor(mins / 60), unit: "hrs" }
      : { nb: Math.floor(mins), unit: "min" };
  };

  const memoizedData = useMemo(() => trips, [trips]);
  const allTrips = memoizedData ? memoizedData : trips ? trips : [];

  return (
    <>
      <div className="px-5 py-16">
        <h1 className="text-4xl font-bold">
          {getFirebaseAuth().currentUser?.displayName
            ? t("homepage.header.greeting", {
                name: getFirebaseAuth().currentUser?.displayName,
              })
            : t("homepage.header.noUserGreeting")}
        </h1>
        <p className="text-neutral-400 text-xl mt-1">
          {t("homepage.header.subtitle")}
        </p>
        <button onClick={() => console.log(trips)}>Test</button>
        <div className="bg-neutral-800 rounded-xl h-max py-6 px-8 mt-6 border border-neutral-600">
          <div className="grid grid-cols-3 items-center justify-between">
            <div className="flex flex-col items-center">
              <span className="text-violet-500 text-3xl font-bold">
                {getTotalKms()}
              </span>
              <span className="text-neutral-400 text-lg">km</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-violet-500 text-3xl font-bold">
                {trips?.length}
              </span>
              <span className="text-neutral-400 text-lg">
                {t(trips && trips.length > 1 ? "common.trips" : "common.trip")}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-violet-500 text-3xl font-bold">
                {getTotalDrivingTime().nb}
              </span>
              <span className="text-neutral-400 text-lg">
                {getTotalDrivingTime().unit}
              </span>
            </div>
          </div>

          {/* <div className="relative h-6 bg-neutral-700 w-full rounded-full mt-8 overflow-hidden">
            <div
              className={`h-full bg-violet-500`}
              style={{ width: `${getKmsPercent()}%` }}
            ></div>
          </div> */}
          {/* <span className="text-neutral-400 font-semibold block mt-2">
            {getKmsPercent()}%
          </span> */}
          <PrettyProgress percent={getKmsPercent()} />
        </div>

        <div className="flex flex-row items-center justify-between mt-8 mb-4 ">
          <h2 className="block text-3xl font-semibold">
            {t("homepage.recent.title")}
          </h2>
          <button
            className="block h-fit text-neutral-400"
            onClick={() => setTripsPanelOpened(true)}
          >
            {t("common.seeAll")}
          </button>
        </div>
        {allTrips.slice(0, 5).map((trip) => {
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
        <div className="relative">
          <SlidingPage
            setPanelOpened={setTripsPanelOpened}
            isOpened={tripsPanelOpened}
            className="absolute"
          >
            <Trips data={memoizedData} />
          </SlidingPage>
        </div>
      </div>
    </>
  );
}
