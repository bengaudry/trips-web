import { Input } from "../../../../components/form";
import { Cta } from "../../../../components";
import { useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getFirebaseApp } from "../../../../../server";
import { Notification } from "../../../../components";

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

  const db = getFirestore(getFirebaseApp());
  const tripsCollection = collection(db, "/schoolsCodes");

  // Fetches in firestore where the codes equals to the code in the input
  const fetchData = async () => {
    let q = query(tripsCollection, where("value", "==", code));
    await getDocs(q)
      .then((val) => {
        // fetched data
        const fetchedDoc = val.docs[0]
        const data = fetchedDoc.data();
        const id = fetchedDoc.id;

        if (fetchedDoc && data.value === code) {
          // Delete the code after it has been used
          deleteDoc(doc(db, "/schoolsCodes", id))
            .then(() => {
              setNotificationContent({
                content: "Vous avez rejoint l'auto-école",
                type: "success",
              });
              setNotificationVisible(true);
            })
            .catch((err) => {
              alert(err);
            });
        } else {
          setNotificationContent({
            content: "Le code ne semble pas être valide",
            type: "error",
          });
          setNotificationVisible(true);
        }
      })
      .catch(() => {
        setNotificationContent({
          content: "Le code ne semble pas être valide",
          type: "error",
        });
        setNotificationVisible(true);
      });
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
