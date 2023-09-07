import { Input } from "../../../../../components/form";
import { Cta } from "../../../../../components";
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
import { Notification } from "../../../../../components";

export function DrivingSchool() {
  const [code, setCode] = useState("");

  const [notificationContent, setNotificationContent] = useState<{
    content: string;
    type: "success" | "error";
  }>({
    content: "Vous avez rejoint l'auto-école ...",
    type: "success",
  });

  const [notificationVisible, setNotificationVisible] = useState(false);

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
              setNotificationContent({
                content: `Vous avez rejoint l'auto-école ${schoolName}`,
                type: "success",
              });
              setNotificationVisible(true);
            })
            .catch((err) => {
              setNotificationContent({
                content: `Erreur. Veuillez contacter le développeur. (${err})`,
                type: "error",
              });
            });
        } else {
          console.log("fetched doc :", fetchedDoc);
          console.log("data.value :", data.value);

          setNotificationContent({
            content: "Le code ne semble pas être valide",
            type: "error",
          });
          setNotificationVisible(true);
        }
      })
      .catch((err) => {
        setNotificationContent({
          content: `Le code ne semble pas être valide.`,
          type: "error",
        });
        setNotificationVisible(true);
      });
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
      <Notification
        visible={notificationVisible}
        setVisible={setNotificationVisible}
        content={notificationContent.content}
        type={notificationContent.type}
      />
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
