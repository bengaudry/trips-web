import { TripDisplayer, Cta } from "../../../components";
import { Trip } from "../../../types/types";

export function Trips(props: { data?: Trip[] }) {
  return (
    <>
      {props.data && props.data.length > 0 ? (
        props.data.map((trip) => (
          <TripDisplayer
            from={trip.from}
            to={trip.to}
            date={trip.date}
            length={trip.length}
            duration={trip.duration}
            roundTrip={trip.roundTrip}
            key={trip.key}
            id={trip.id}
            data={props.data}
            showMoreOptBtn
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
