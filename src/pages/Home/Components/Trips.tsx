import { TripDisplayer } from "../../../components/TripDisplayer";
import { Cta } from "../../../components/Buttons/Cta";
import { ShortTrip } from "../../../types/types";

export function Trips(props: {
  className: string;
  setTripsPanelOpened: CallableFunction;
  data?: ShortTrip[];
}) {
  return (
    <div
      className={`px-5 py-16 pt-4 z-40 fixed top-0 left-0 w-full h-screen bg-slate-900 transition-transform duration-500 ${props.className} overflow-y-scroll`}
    >
      <button
        className="text-slate-400 font-semibold text-lg mb-8 flex flex-row items-center gap-2"
        onClick={() => props.setTripsPanelOpened(false)}
      >
        <i className="fi fi-rr-angle-left block text-sm"></i>
        <span className="block h-min -translate-y-0.5">Back</span>
      </button>
      <h1 className="text-4xl font-semibold mb-5">My trips</h1>
      {props.data && props.data.length > 0 ? (
        props.data.map((trip, index) => (
          <TripDisplayer
            from={trip.from}
            to={trip.to}
            date={trip.date}
            length={trip.length}
            duration={trip.duration}
            roundTrip={trip.roundTrip}
            key={index}
          />
        ))
      ) : (
        <>
          <p className="text-center block w-full text-2xl my-4 mt-8">
            No trips yet
          </p>
          <img
            src="/empty.png"
            className="block m-auto w-9/12 py-8 rounded-lg overflow-hidden"
          />
          <Cta func="link" to="/add">
            Add one here
          </Cta>
        </>
      )}
    </div>
  );
}
