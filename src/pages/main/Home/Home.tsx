import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { getFirebaseApp, getFirebaseAuth } from "../../../../server";

import { Trip } from "../../../types/types";
import { calculateDataForStats } from "../../../lib/functions";

import {
  Cta,
  Modal,
  NotVerifiedEmailPopup,
  PageLayout,
  PanelSwitcher,
  SecondaryText,
} from "../../../components";
import { Input } from "../../../components/form";
import { Trips } from "./Components/Trips";
import { Stats } from "./Components/Stats";
import { User, updateCurrentUser, updateProfile } from "firebase/auth";

export function Home() {
  const { t } = useTranslation();

  const [trips, setTrips] = useState<Trip[]>();
  const [currentPanel, setCurrentPanel] = useState<0 | 1>(0);

  const displayName = getFirebaseAuth().currentUser?.displayName;
  const [userNameUnset, setUserNameUnset] = useState(!displayName);
  const [newDisplayName, setNewDisplayName] = useState("");

  const changePanel = (val: number) => {
    if (val === 0 || val === 1) {
      setCurrentPanel(val);
    }
  };

  // Fetches user data from firebase
  useEffect(() => {
    const db = getFirestore(getFirebaseApp());
    const tripsCollection = collection(db, "/trips");

    const fetchData = async () => {
      let q = query(
        tripsCollection,
        where("uid", "==", getFirebaseAuth().currentUser?.uid),
        orderBy("date", "desc")
      );
      await getDocs(q)
        .then((val) => {
          setTrips(
            val.docs.map((doc, index) => ({
              ...(doc.data() as Trip),
              id: doc.id,
              key: index,
            }))
          );
        })
        .catch((err) => console.error(`Error while fetching data : ${err}`));
    };

    fetchData();
  }, []);

  // Scroll to top when panel changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPanel]);

  const memoizedData = useMemo(() => trips, [trips]);
  const allTrips = memoizedData ? memoizedData : trips ? trips : [];

  console.log("name", getFirebaseAuth().currentUser?.displayName);

  return (
    <>
      <PageLayout className="overflow-y-scroll">
        <NotVerifiedEmailPopup className="mb-4" />

        <SecondaryText className="text-xl mt-1">
          {t("homepage.header.subtitle")}
        </SecondaryText>

        {userNameUnset && (
          <Modal
            showFn={new Function()}
            isShown={userNameUnset}
            title="Hey ! We haven't met yet"
            unClosable
          >
            <SecondaryText>
              Looks like we haven't met yet ! How should we call you ?
            </SecondaryText>
            <Input
              name="Your name"
              type="text"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
            />
            <Cta
              type="button"
              className="mt-4"
              onClick={() => {
                if (
                  newDisplayName.length >= 2 &&
                  getFirebaseAuth().currentUser
                ) {
                  updateProfile(getFirebaseAuth().currentUser as User, {
                    displayName: newDisplayName,
                  })
                    .then(() => setUserNameUnset(false))
                    .catch((err) => {
                      console.error(err);
                    });
                }
              }}
            >
              Submit
            </Cta>
          </Modal>
        )}

        <h1 className="text-4xl font-bold">
          {getFirebaseAuth().currentUser?.displayName
            ? `${getFirebaseAuth().currentUser?.displayName} 👋`
            : ""}
        </h1>

        <div className="dark:bg-grayblue-900/90 backdrop-blur-lg sticky z-20 top-0 py-3">
          <PanelSwitcher
            tabs={[t("homepage.slider.stats"), t("homepage.slider.trips")]}
            current={currentPanel}
            onChange={(val) => changePanel(val)}
          />
        </div>

        {currentPanel === 0 ? (
          <Stats
            allTrips={allTrips}
            setPanelFn={setCurrentPanel}
            data={calculateDataForStats(trips)}
          />
        ) : (
          <Trips data={memoizedData} />
        )}
      </PageLayout>
    </>
  );
}
