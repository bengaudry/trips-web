import { Link } from "react-router-dom";
import { TripDisplayer, Trip } from "../../../components/TripDisplayer";
import { Cta } from "../../../components/Buttons/Cta";

const fakeTrips: Trip[] = [
  //   {
  //     from: "essertines en donzy",
  //     to: "Feurs",
  //     date: new Date(),
  //     kms: 15,
  //     duration: 12,
  //   },
  //   {
  //     from: "feurs",
  //     to: "saint-galmier",
  //     date: new Date(),
  //     kms: 25,
  //     duration: 30,
  //   },
  //   {
  //     from: "essertines en donzy",
  //     to: "Feurs",
  //     date: new Date(),
  //     kms: 15,
  //     duration: 12,
  //   },
  //   {
  //     from: "feurs",
  //     to: "saint-galmier",
  //     date: new Date(),
  //     kms: 25,
  //     duration: 30,
  //   },
  //   {
  //     from: "essertines en donzy",
  //     to: "Feurs",
  //     date: new Date(),
  //     kms: 15,
  //     duration: 12,
  //   },
  //   {
  //     from: "feurs",
  //     to: "saint-galmier",
  //     date: new Date(),
  //     kms: 25,
  //     duration: 30,
  //   },
  //   {
  //     from: "essertines en donzy",
  //     to: "Feurs",
  //     date: new Date(),
  //     kms: 15,
  //     duration: 12,
  //   },
  //   {
  //     from: "feurs",
  //     to: "saint-galmier",
  //     date: new Date(),
  //     kms: 25,
  //     duration: 30,
  //   },
];

export function Trips(props: {
  className: string;
  setTripsPanelOpened: CallableFunction;
}) {
  return (
    <div
      className={`px-5 py-16 pt-4 z-40 fixed top-0 left-0 w-full h-screen bg-slate-900 transition-transform duration-500 ${props.className}`}
    >
      <button
        className="text-slate-400 font-semibold text-lg mb-8 flex flex-row items-center gap-2"
        onClick={() => props.setTripsPanelOpened(false)}
      >
        <i className="fi fi-rr-angle-left block text-sm"></i>
        <span className="block h-min -translate-y-0.5">Back</span>
      </button>
      <h1 className="text-4xl font-semibold mb-5">My trips</h1>
      {fakeTrips.length > 0 ? (
        fakeTrips.map((trip, index) => (
          <TripDisplayer
            from={trip.from}
            to={trip.to}
            date={trip.date}
            kms={trip.kms}
            duration={trip.duration}
            key={index}
          />
        ))
      ) : (
        <>
          <p className="text-center block w-full text-2xl my-4 mt-8">
            No trips yet
          </p>
          <img src="/empty.png" className="block m-auto w-9/12 py-8 rounded-lg overflow-hidden" />
          <Cta func="link" to="/add">
            Add one here
          </Cta>
        </>
      )}
    </div>
  );
}
