import { UserCredential, User } from "firebase/auth";
import { TripDisplayer, Trip } from "../../components/TripDisplayer";
import { Trips } from "./Components";
import { useState } from "react";

const fakeTrips: Trip[] = [
  {
    from: "essertines en donzy",
    to: "Feurs",
    date: new Date(),
    kms: 15,
    duration: 12,
  },
  {
    from: "feurs",
    to: "saint-galmier",
    date: new Date(),
    kms: 25,
    duration: 30,
  },
];

export function Home(props: { user: User }) {
  const [tripsPanelOpened, setTripsPanelOpened] = useState<boolean>(false);

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
      {fakeTrips.map((trip) => (
        <TripDisplayer
          from={trip.from}
          to={trip.to}
          date={trip.date}
          kms={trip.kms}
          duration={trip.duration}
        />
      ))}
      <Trips
        className={`${tripsPanelOpened ? "" : "translate-x-full"}`}
        setTripsPanelOpened={setTripsPanelOpened}
      />
    </div>
  );
}
