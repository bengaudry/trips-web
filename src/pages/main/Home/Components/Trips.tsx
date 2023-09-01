import { useEffect, useState } from "react";
import {
  TripDisplayer,
  Cta,
  Modal,
  SecondaryText,
} from "../../../../components";
import { Trip } from "../../../../types/types";
import { getFirestore, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getFirebaseApp } from "../../../../../server";
import {
  capitalizeString,
  removeElementAtIndex,
} from "../../../../lib/functions";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../../../../components/form";

export function Trips(props: {
  data?: Trip[];
  onDataChange: (newData: Trip[]) => void;
}) {
  const { t } = useTranslation();

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

  const [roundTrip, setRoundTrip] = useState<boolean | undefined>(
    modalContent?.trip.roundTrip
  );

  useEffect(() => {
    setRoundTrip(modalContent?.trip.roundTrip);
  }, [modalContent]);

  const handleDeleteTrip = () => {
    if (confirm("Do you really want to delete this trip ?")) {
      const db = getFirestore(getFirebaseApp());
      console.log("[db] :", db);
      if (modalContent?.trip.id) {
        deleteDoc(doc(db, "/trips", modalContent?.trip.id as string))
          .then(() => {
            if (props.data) {
              let newData = removeElementAtIndex(
                [...props.data],
                modalContent.key
              );
              props.onDataChange(newData);
            } else {
              window.location.reload();
            }
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        console.error("Error: id is undefined");
      }
    }
  };

  const handleRoundTripChange = (val: boolean) => {
    setRoundTrip(val);
    const db = getFirestore(getFirebaseApp());
    let ref = doc(db, "/trips", modalContent?.trip.id as string);
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
      .catch((err) => alert(err));
  };

  return (
    <div className="pt-3">
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
          <Modal
            showFn={setModalOpened}
            isShown={modalOpened}
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
            <SecondaryText className="text-lg mb-4">
              {modalContent?.trip.length}kms - {modalContent?.trip.duration}min
              <br />
              {modalContent?.trip.date &&
                new Date(modalContent.trip.date).toLocaleDateString()}
            </SecondaryText>
            <Checkbox
              name={t("addpage.inputs.labels.roundtrip")}
              checked={!!roundTrip}
              setChecked={handleRoundTripChange}
            />
            <Cta type="button" color="danger" onClick={handleDeleteTrip}>
              Delete trip
            </Cta>
          </Modal>
        </>
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
