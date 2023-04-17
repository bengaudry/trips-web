import { Trip } from "../../../types/types";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getFirebaseApp } from "../../../../server";
import { strTruish } from "../../functions";
import { anyTruish } from "../checkings/checkings";

export async function addTrip(content: Trip) {
  if (checkTripBeforeSending(content)) {
    const db = getFirestore(getFirebaseApp());
    const tripsCollection = collection(db, "/trips");

    await addDoc(tripsCollection, content)
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.log("Firebase error :", err);
        alert("Error while sending to the database, please contact us");
        return false;
      });

    return true;
  }

  return false;
}

export function checkTripBeforeSending(content: Trip) {
  if (
    strTruish(content.date) &&
    anyTruish(content.length) &&
    anyTruish(content.duration) &&
    strTruish(content.from) &&
    strTruish(content.to) &&
    strTruish(content.id) &&
    strTruish(content.roadType) &&
    strTruish(content.time) &&
    strTruish(content.trafficDensity) &&
    strTruish(content.uid) &&
    strTruish(content.weather)
  ) {
    return true;
  }
  return false;
}
