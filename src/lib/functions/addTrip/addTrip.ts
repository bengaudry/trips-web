import { anyTruish, strTruish } from "@/lib/functions";
import { Trip } from "@/types";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { getFirebaseDb } from "../../../../server";

export async function addTrip(content: Trip) {
  const tripsCollection = collection(getFirebaseDb(), "/trips");

  return await addDoc(tripsCollection, content)
    .catch((err) => {
      toast(`Error while adding trip to database. (Code: ${err.code})`, {
        type: "error",
      });
    });
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
