import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getFirebaseDb } from "../../../../../server";

import { Cta, Modal, Text, TripDisplayer } from "components";
import { Checkbox } from "components/form";

import { toast } from "react-toastify";
import {
  capitalizeString,
  removeElementAtIndex,
} from "../../../../lib/functions";
import { Trip } from "../../../../types/types";

export function Trips(props: {
  data?: Array<Trip>;
  onDataChange: (newData: Array<Trip>) => void;
}) {
  const { t } = useTranslation();

  const [modalOpened, setModalOpened] = useState(false);
  const [modalContent, setModalContent] = useState<{
    trip: Trip;
    key: number;
  }>();

  // Disables scroll while popup is opened
  useEffect(() => {
    document.body.style.overflow = modalOpened ? "hidden" : "auto";
  }, [modalOpened]);

  const [roundTrip, setRoundTrip] = useState<boolean | undefined>(
    modalContent?.trip.roundTrip
  );

  useEffect(() => {
    setRoundTrip(modalContent?.trip.roundTrip);
  }, [modalContent]);

  const handleDeleteTrip = () => {
    if (confirm("Do you really want to delete this trip ?")) {
      // Checking if the modal contains an id to avoid errors
      if (modalContent?.trip.id) {
        // Deletes the trip from the database
        deleteDoc(doc(getFirebaseDb(), "/trips", modalContent.trip.id))
          .then(() => {
            // Deletes the trip from cache and closes the modal if there is cache
            if (props.data) {
              let newData = removeElementAtIndex(
                [...props.data],
                modalContent.key
              );
              props.onDataChange(newData);
              setModalOpened(false);
            } else {
              // Refetch the data if there is no cache
              window.location.reload();
            }
          })
          .catch((err) => {
            toast(
              `Error while deleting trip. Please try again. (Code: ${err.code})`,
              { type: "error" }
            );
          });
      } else {
        toast(`Error while deleting trip. Please contact us.`, {
          type: "error",
        });
      }
    }
  };

  const handleRoundTripChange = (val: boolean) => {
    setRoundTrip(val);
    let ref = doc(getFirebaseDb(), "/trips", modalContent?.trip.id as string);
    console.log("id", modalContent?.trip.id);
    updateDoc(ref, { roundTrip: val })
      .then(() => {
        if (props.data && modalContent?.key !== undefined) {
          let newData = [...props.data];
          newData[modalContent.key] = {
            ...newData[modalContent.key],
            roundTrip: val,
          };
          props.onDataChange(newData);
        } else {
          window.location.reload();
        }
      })
      .catch((err) =>
        toast(
          `Error while editing your trip. Please try again. (Code: ${err.code})`,
          { type: "error" }
        )
      );
  };

  return (
    <div className="pt-3">
      {props.data && props.data.length > 0 ? (
        <div>
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
          <Modal
            visible={modalOpened}
            setVisible={setModalOpened}
            title={
              <>
                <span>{capitalizeString(modalContent?.trip.from)}</span>
                {modalContent?.trip.roundTrip ? (
                  <i className="fi fi-rr-exchange inline-block mx-3 translate-y-0.5"></i>
                ) : (
                  <i className="fi fi-rr-arrow-right inline-block mx-3 translate-y-0.5"></i>
                )}
                <span>{capitalizeString(modalContent?.trip.to)}</span>
              </>
            }
          >
            <Text.Secondary className="text-lg mb-4">
              {modalContent?.trip.length}kms - {modalContent?.trip.duration}min
              <br />
              {modalContent?.trip.date &&
                new Date(modalContent.trip.date).toLocaleDateString()}
            </Text.Secondary>
            <Checkbox
              name={t("addpage.inputs.labels.roundtrip")}
              checked={!!roundTrip}
              setChecked={handleRoundTripChange}
            />
            <Cta type="button" color="danger" onClick={handleDeleteTrip}>
              Delete trip
            </Cta>
          </Modal>
        </div>
      ) : (
        <>
          <p className="text-center block w-full text-2xl my-4 mt-8">
            {t("homepage.emptyTripsList")}
          </p>
          <img
            src="/illustrations/empty-list.png"
            alt="An illustration of an empty place..."
            width={300}
            className="block mx-auto"
          />
          <Cta type="link" to="/add">
            {t("homepage.addFirstTrip")}
          </Cta>
        </>
      )}
    </div>
  );
}
