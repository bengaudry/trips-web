import { Trip } from "../../types/types";
import { Cta, Modal } from "../../components";
import { useState } from "react";
import { deleteDoc, getFirestore, collection, doc } from "firebase/firestore";
import { getFirebaseApp } from "../../../server";

function capitalizeWord(str: string | undefined) {
  if (str) return str.charAt(0).toUpperCase() + str.slice(1);
  else return "";
}

function convertDuration(min: number | undefined): string {
  if (min === undefined) {
    return "0";
  }
  if (min < 60) {
    return `${min.toString()}min`;
  }
  return `${Math.floor(min / 60)}h ${min % 60}min`;
}

interface TripDisplayerProps extends Trip {
  showMoreOptBtn?: boolean;
  data?: Array<any>;
}

export function TripDisplayer(props: TripDisplayerProps) {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="w-full grid grid-cols-[calc(100%-2rem)_2rem] py-2 px-6 bg-grayblue-800 rounded-xl mb-3">
      <div className="flex flex-col">
        <span
          className="relative w-full font-semibold overflow-hidden whitespace-nowrap after:absolute after:w-10 after:h-6 after:right-0 after:bg-gradient-to-r after:from-grayblue-800/0 after:to-grayblue-800"
          title={`From ${capitalizeWord(props.from)} to ${capitalizeWord(
            props.to
          )}`}
        >
          {capitalizeWord(props.from)}
          {props.roundTrip ? (
            <i className="fi fi-rr-exchange inline-block mx-3 translate-y-0.5"></i>
          ) : (
            <i className="fi fi-rr-arrow-right inline-block mx-3 translate-y-0.5"></i>
          )}
          {capitalizeWord(props.to)}
        </span>
        <span className="text-grayblue-400">
          {props.date} - {props.length}km - {convertDuration(props.duration)}
        </span>
      </div>
      <button
        className={`${
          props.showMoreOptBtn ? "" : "hidden"
        } text-grayblue-500 block py-2 w-full text-right`}
        onClick={() => setModalOpened(true)}
      >
        <i className="fi fi-rr-menu-dots-vertical"></i>
      </button>
      <Modal showFn={setModalOpened} isShown={modalOpened}>
        {/* <ul>
          <li>
            <span>Date : </span>
            {props.date}
          </li>
          <li>
            <span>Duration : </span>
            {props.duration}
          </li>
          <li>
            <span>From : </span>
            {props.from}
          </li>
          <li>
            <span>To : </span>
            {props.to}
          </li>
          <li>
            <span>Length : </span>
            {props.length}
          </li>
          <li>
            <span>Road type : </span>
            {props.roadType}
          </li>
          <li>
            <span>Round trip : </span>
            {props.roundTrip}
          </li>
          <li>
            <span>Time : </span>
            {props.time}
          </li>
          <li>
            <span>Traffic density : </span>
            {props.trafficDensity}
          </li>
          <li>
            <span>Weather : </span>
            {props.weather}
          </li>
        </ul> */}
        <h2
          className="text-xl mb-4 font-semibold"
        >
          {capitalizeWord(props.from)}
          {props.roundTrip ? (
            <i className="fi fi-rr-exchange inline-block mx-3 translate-y-0.5"></i>
          ) : (
            <i className="fi fi-rr-arrow-right inline-block mx-3 translate-y-0.5"></i>
          )}
          {capitalizeWord(props.to)}
        </h2>
        <Cta
          type="button"
          color="danger"
          onClick={async () => {
            if (confirm("Do you really want to delete this trip ?")) {
              const db = getFirestore(getFirebaseApp());
              console.log(props, props.id);
              await deleteDoc(doc(db, "/trips", props.id as string))
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
    </div>
  );
}
