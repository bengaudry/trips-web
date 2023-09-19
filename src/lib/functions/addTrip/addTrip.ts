import { addDoc, collection } from "firebase/firestore";
import { getFirebaseDb } from "../../../../server";
import { strTruish, anyTruish } from "../../functions";
import { Trip } from "../../../types/types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export async function addTrip(content: Trip) {
  const tripsCollection = collection(getFirebaseDb(), "/trips");
  const navigate = useNavigate();

  await addDoc(tripsCollection, content)
    .then(() => {
      navigate("/");
    })
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
