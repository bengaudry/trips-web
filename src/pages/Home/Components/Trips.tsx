import { useEffect, useState } from "react";
import { TripDisplayer, Cta, Modal } from "../../../components";
import { Trip } from "../../../types/types";
import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import { getFirebaseApp } from "../../../../server";
import { capitalizeString } from "../../../lib/functions";

export function Trips(props: { data?: Trip[] }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalContent, setModalContent] = useState<{
    trip: Trip;
    key: number;
  }>();
  // Disables scroll while popup is opened
  useEffect(() => {
    if (modalOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpened]);

  const handleDeleteTrip = () => {
    if (confirm("Do you really want to delete this trip ?")) {
      const db = getFirestore(getFirebaseApp());
      console.log("[db] :", db);
      if (modalContent?.trip.id) {
        deleteDoc(doc(db, "/trips", modalContent?.trip.id as string))
          .then(() => {
            window.location.href = "";
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        console.error("Error: id is undefined");
      }
    }
  };

  return (
    <div className="pt-3 min-h-screen">
      {props.data && props.data.length > 0 ? (
        <>
          {props.data.map((trip, key) => (
            <TripDisplayer
              {...trip}
              showMoreOptBtn
              setModalOpened={(val: boolean) => {
                setModalOpened(val);
                setModalContent({ trip: trip, key: key });
              }}
            />
          ))}
          <Modal showFn={setModalOpened} isShown={modalOpened}>
            <h2 className="text-xl mb-4 font-semibold">
              <span>{capitalizeString(modalContent?.trip.from)}</span>
              {modalContent?.trip.roundTrip ? (
                <i className="fi fi-rr-exchange inline-block mx-3 translate-y-0.5"></i>
              ) : (
                <i className="fi fi-rr-arrow-right inline-block mx-3 translate-y-0.5"></i>
              )}
              <span>{capitalizeString(modalContent?.trip.to)}</span>
            </h2>
            <Cta type="button" color="danger" onClick={handleDeleteTrip}>
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
