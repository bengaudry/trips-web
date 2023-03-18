import { User } from "firebase/auth";
import { TripDisplayer } from "../../components/TripDisplayer";
import { Trips } from "./Components";
import { useEffect, useMemo, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { getFirebaseApp } from "../../../server";
import { ShortTrip } from "../../types/types";

export function Home(props: { user: User }) {
  const [tripsPanelOpened, setTripsPanelOpened] = useState<boolean>(false);
  const [trips, setTrips] = useState<ShortTrip[]>();

  useEffect(() => {
    const db = getFirestore(getFirebaseApp());
    const tripsCollection = collection(db, "/trips");

    const fetchData = async () => {
      let q = query(tripsCollection, where("uid", "==", props.user.uid));
      const response = await getDocs(q);
      const newData = response.docs.map((doc) => ({
        id: doc.id,
        date: doc.data().date,
        from: doc.data().from,
        to: doc.data().to,
        length: doc.data().length,
        duration: doc.data().duration,
        roundTrip: doc.data().roundTrip,
      }));
      setTrips(newData);
      console.log(newData);
    };

    fetchData();
  }, []);

  const getTotalKms = (): number => {
    let kms = 0;
    trips?.map(
      (trip) => (kms += trip.roundTrip ? trip.length * 2 : trip.length)
    );
    return kms;
  };

  const getKmsPercent = (): number => {
    const maximumKms = 3000;
    console.log("percent : ", Math.floor((getTotalKms() / maximumKms) * 100));
    return Math.floor((getTotalKms() / maximumKms) * 100);
  };

  const getTotalDrivingTime = () => {
    let mins = 0;
    trips?.map(
      (trip) => (mins += trip.roundTrip ? trip.duration * 2 : trip.duration)
    );
    return mins;
  };

  const memoizedData = useMemo(() => trips, [trips]);

  return (
    <>
      <div className="px-5 py-16">
        <h1 className="text-4xl font-semibold">
          Hi {props.user.displayName} !
        </h1>
        <p className="text-slate-400 text-xl mt-1">
          Here is a resume of your trips
        </p>
        <div className="bg-slate-800 rounded-2xl h-max py-6 px-8 mt-6 border border-slate-600">
          <div className="grid grid-cols-3 items-center justify-between">
            <div className="flex flex-col items-center">
              <span className="text-emerald-400 text-3xl font-bold">
                {getTotalKms()}
              </span>
              <span className="text-slate-400 text-xl">km</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-emerald-400 text-3xl font-bold">
                {trips?.length}
              </span>
              <span className="text-slate-400 text-xl">
                trip{trips && trips.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-emerald-400 text-3xl font-bold">
                {getTotalDrivingTime() >= 60
                  ? getTotalDrivingTime() / 60
                  : getTotalDrivingTime()}
              </span>
              <span className="text-slate-400 text-xl">
                {getTotalDrivingTime() >= 60 ? "hrs" : "min"}
              </span>
            </div>
          </div>

          <div className="relative h-6 bg-slate-700 w-full rounded-full mt-8 overflow-hidden">
            <div
              className={`h-full bg-emerald-400`}
              style={{width: `${getKmsPercent()}%`}}
            ></div>
          </div>
          <span className="text-slate-400 font-semibold block mt-2">
            {getKmsPercent()}%
          </span>
        </div>

        <div className="flex flex-row items-center justify-between mt-8 mb-4 ">
          <h2 className="block text-3xl font-semibold">Recent trips</h2>
          <button
            className="block h-fit text-slate-500"
            onClick={() => setTripsPanelOpened(!tripsPanelOpened)}
          >
            See all
          </button>
        </div>
        {memoizedData
          ? memoizedData.map((trip, index) => {
              while (index < 5) {
                return (
                  <TripDisplayer
                    from={trip.from}
                    to={trip.to}
                    date={trip.date}
                    length={trip.length}
                    roundTrip={trip.roundTrip}
                    duration={trip.duration}
                  />
                );
              }
            })
          : ""}
        <Trips
          className={`${tripsPanelOpened ? "" : "translate-x-full"}`}
          setTripsPanelOpened={setTripsPanelOpened}
          data={memoizedData}
        />
      </div>
    </>
  );
}
