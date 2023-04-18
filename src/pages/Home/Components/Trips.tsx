import { useEffect, useState } from "react";
import { TripDisplayer, Cta, Modal } from "../../../components";
import { Trip } from "../../../types/types";
import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import { getFirebaseApp } from "../../../../server";
import { capitalizeString } from "../../../lib/functions";

export function Trips(props: { data?: Trip[] }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalContent, setModalContent] = useState<Trip>();

  useEffect(() => {
    if (modalOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [modalOpened]);

  return (
    <div className="pt-3">
      {props.data && props.data.length > 0 ? (
        <>
          {props.data.map((trip) => (
            <TripDisplayer
              from={trip.from}
              to={trip.to}
              date={trip.date}
              length={trip.length}
              duration={trip.duration}
              roundTrip={trip.roundTrip}
              key={trip.key}
              id={trip.id}
              showMoreOptBtn
              setModalOpened={(val: boolean) => {
                setModalOpened(val);
                setModalContent(trip);
              }}
            />
          ))}
          <Modal showFn={setModalOpened} isShown={modalOpened}>
            <h2 className="text-xl mb-4 font-semibold">
              <span>{capitalizeString(modalContent?.from)}</span>
              {modalContent?.roundTrip ? (
                <i className="fi fi-rr-exchange inline-block mx-3 translate-y-0.5"></i>
              ) : (
                <i className="fi fi-rr-arrow-right inline-block mx-3 translate-y-0.5"></i>
              )}
              <span>{capitalizeString(modalContent?.to)}</span>
            </h2>
            <Cta
              type="button"
              color="danger"
              onClick={async () => {
                if (confirm("Do you really want to delete this trip ?")) {
                  const db = getFirestore(getFirebaseApp());
                  await deleteDoc(doc(db, "/trips", modalContent?.id as string))
                    .then(() => (document.location.href = "/"))
                    .catch((err) => {
                      alert(err);
                    });
                }
              }}
            >
              Delete trip
            </Cta>
          </Modal>
        </>
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
    </div>
  );
}
