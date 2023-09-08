import { useState } from "react";

import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getFirebaseDb } from "../../../../../../server";

import { Input } from "components/form";
import { Cta } from "components";

export function DrivingSchool() {
  const [code, setCode] = useState("");

  const schoolsCodesCollection = collection(getFirebaseDb(), "/schoolsCodes");
  const [schoolName, setSchoolName] = useState("");

  // Fetches in firestore where the codes equals to the code in the input
  const fetchData = async () => {
    let q = query(schoolsCodesCollection, where("value", "==", code));
    await getDocs(q)
      .then((val) => {
        // fetched data
        const fetchedDoc = val.docs[0];
        const data = fetchedDoc.data();
        const id = fetchedDoc.id;

        if (fetchedDoc && data.value === code) {
          // Delete the code after it has been used
          deleteDoc(doc(getFirebaseDb(), "/schoolsCodes", id))
            .then(() => {
              fetchSchoolWithId(data.schoolId);
            })
            .catch((err) => {});
        } else {
          console.log("fetched doc :", fetchedDoc);
          console.log("data.value :", data.value);
        }
      })
      .catch((err) => {});
  };

  const fetchSchoolWithId = (id: string) => {
    const schoolsDoc = doc(getFirebaseDb(), "schools", id);

    getDoc(schoolsDoc).then((val) => {
      console.log(val.data());
      setSchoolName(val.data()?.name);
    });
    return schoolName;
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          name="Votre code"
          type="text"
          placeholder="Rentrez le code fourni par votre auto-école"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Cta
          type="button"
          btnType="submit"
          className="mt-4"
          disabled={code.length !== 17}
          onClick={() => {
            fetchData();
          }}
        >
          Rejoindre l'auto-école
        </Cta>
      </form>
    </>
  );
}
