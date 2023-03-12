import { TripDisplayer, Trip } from "../../components/TripDisplayer";

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

export function Trips() {
  return (
    <div className="px-5 py-16">
      <h1 className="text-4xl font-semibold mb-5">My trips</h1>
      {fakeTrips.map((trip) => (
        <TripDisplayer
          from={trip.from}
          to={trip.to}
          date={trip.date}
          kms={trip.kms}
          duration={trip.duration}
        />
      ))}
    </div>
  );
}
