import { TripDisplayer, Cta } from "../../../components";
import { ShortTrip } from "../../../types/types";

export function Trips(props: { data?: ShortTrip[] }) {
  return (
    <>
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
          <Cta type="link" to="/add">
            Add one here
          </Cta>
        </>
      )}
    </>
  );
}
