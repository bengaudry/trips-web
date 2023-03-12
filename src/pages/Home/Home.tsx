import { RecentTrip, Trip } from "./components/RecentTrip";

const fakeTrips: Trip[] = [
  {
    from: "essertines en donzy",
    to: "Feurs",
    date: new Date(),
    kms: 15,
    duration: 12
  },
  {
    from: "feurs",
    to: "saint-galmier",
    date: new Date(),
    kms: 25,
    duration: 30
  }
]

export function Home(props: { name: string }) {
  return (
    <div className="px-5 py-16">
      <h1 className="text-5xl font-semibold">Hello {props.name} !</h1>
      <p className="text-slate-400 text-3xl mt-1">
        Here is a resume of your trips
      </p>
      <div className="bg-slate-800 rounded-2xl h-max p-10 mt-10 border border-slate-600">
        <div className="flex flex-row items-center justify-evenly">
          <div className="flex flex-col items-center">
            <span className="text-emerald-400 text-5xl font-bold">1440</span>
            <span className="text-slate-400 text-2xl">km</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-emerald-400 text-5xl font-bold">52</span>
            <span className="text-slate-400 text-2xl">trips</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-emerald-400 text-5xl font-bold">1440</span>
            <span className="text-slate-400 text-2xl">km</span>
          </div>
        </div>

        <div className="relative h-10 bg-slate-700 w-full rounded-full mt-8 overflow-hidden">
          <div className={`h-full w-[50%] bg-emerald-400`}></div>
        </div>
        <span className="text-slate-400 font-semibold block mt-2">50%</span>
      </div>

      <h2 className="block my-8 text-3xl font-semibold">Recent trips</h2>
      {fakeTrips.map((trip) => (
        <RecentTrip from={trip.from} to={trip.to} date={trip.date} kms={trip.kms} duration={trip.duration} />
      ))}
    </div>
  );
}
