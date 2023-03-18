import { User } from "firebase/auth";
import { TripDisplayer, Trip } from "../../components/TripDisplayer";
import { Trips } from "./Components";
import { useEffect, useMemo, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getFirebaseApp } from "../../../server";

async function fetchTrips() {
  var result;

  return result;
}

export function Home(props: { user: User }) {
  const [tripsPanelOpened, setTripsPanelOpened] = useState<boolean>(false);
  const [data, setData] = useState<
    {
      id: string;
      date: string;
      from: string;
      to: string;
      length: string;
      duration: string;
      uid: string;
    }[]
  >();

  useEffect(() => {
    const db = getFirestore(getFirebaseApp());
    const tripsCollection = collection(db, "/trips");

    const fetchData = async () => {
      const response = await getDocs(tripsCollection);
      const newData = response.docs.map((doc) => ({
        id: doc.id,
        date: doc.data().date,
        from: doc.data().from,
        to: doc.data().to,
        length: doc.data().length,
        duration: doc.data().duration,
        uid: doc.data().uid,
      }));
      setData(newData);
    };

    fetchData();
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  return (
    <div className="px-5 py-16">
      <h1 className="text-4xl font-semibold">
        Hello {props.user.displayName} !
      </h1>
      <p className="text-slate-400 text-xl mt-1">
        Here is a resume of your trips
      </p>
      <div className="bg-slate-800 rounded-2xl h-max py-6 px-8 mt-6 border border-slate-600">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-center">
            <span className="text-emerald-400 text-3xl font-bold">1440</span>
            <span className="text-slate-400 text-xl">km</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-emerald-400 text-3xl font-bold">52</span>
            <span className="text-slate-400 text-xl">trips</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-emerald-400 text-3xl font-bold">1440</span>
            <span className="text-slate-400 text-xl">km</span>
          </div>
        </div>

        <div className="relative h-6 bg-slate-700 w-full rounded-full mt-8 overflow-hidden">
          <div className={`h-full w-[50%] bg-emerald-400`}></div>
        </div>
        <span className="text-slate-400 font-semibold block mt-2">50%</span>
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
            console.log(trip);
            while (index < 5) {
              return (
                <TripDisplayer
                  from={trip.from}
                  to={trip.to}
                  date={trip.date}
                  length={trip.length}
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
  );
}
