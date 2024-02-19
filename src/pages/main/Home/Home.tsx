import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getFirebaseDb } from "../../../../server";

import {
  calculateDataForStats,
  capitalizeString,
  removeElementAtIndex,
} from "@/lib/functions";
import { Trip } from "@/types";

import { CurrentUser } from "@/api";
import {
  Cta,
  Modal,
  NotVerifiedEmailPopup,
  PageLayout,
  PanelSwitcher,
  Text,
} from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import { SetUserNameModal } from "./Components/SetUserNameModal";
import { Stats } from "./Components/Stats";
import { Trips } from "./Components/Trips";
import { Checkbox } from "@/components/form";
import { toast } from "react-toastify";

function fetchCachedTrips() {
  const data = localStorage.getItem("cached-trips-data");
  if (data && JSON.parse(data)) {
    return JSON.parse(data) as Trip[];
  }
  return undefined;
}

function setTripsInCache(data?: Trip[]) {
  if (data) {
    const trips = JSON.stringify(data);
    localStorage.setItem("cached-trips-data", trips);
  }
}

export function Home() {
  const { t } = useTranslation();

  const [trips, setTrips] = useState<Trip[] | undefined>(fetchCachedTrips());
  const [currentPanel, setCurrentPanel] = useState<0 | 1>(0);

  const [userNameUnset, setUserNameUnset] = useState(
    !CurrentUser.getDisplayName()
  );

  const changePanel = (val: number) => {
    if (val === 0 || val === 1) {
      setCurrentPanel(val);
    }
  };

  // Fetches user data from firebase
  useEffect(() => {
    const tripsCollection = collection(getFirebaseDb(), "/trips");

    const fetchData = async () => {
      let q = query(
        tripsCollection,
        where("uid", "==", CurrentUser.getUid()),
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

  // Caches the fetched trips
  useEffect(() => {
    setTripsInCache(trips);
  }, [trips]);

  // Scroll to top when panel changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPanel]);

  const memoizedData = useMemo(() => trips, [trips]);
  const allTrips = memoizedData ? memoizedData : trips ? trips : [];

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
            if (memoizedData) {
              let newData = removeElementAtIndex(
                [...memoizedData],
                modalContent.key
              );
              setTrips(newData);
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
        if (memoizedData && modalContent?.key !== undefined) {
          let newData = [...memoizedData];
          newData[modalContent.key] = {
            ...newData[modalContent.key],
            roundTrip: val,
          };
          setTrips(newData);
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
    <PageLayout key="home">
      <NotVerifiedEmailPopup className="mb-4" />

      {/* {userNameUnset && (
        <Modal
          visible={userNameUnset}
          title="Hey ! We haven't met yet"
          unClosable
        >
          <SetUserNameModal setUserNameUnset={setUserNameUnset} />
        </Modal>
      )} */}

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

      <header>
        <Text.Secondary className="text-xl mt-1">
          {t("homepage.header.subtitle")}
        </Text.Secondary>
        <Text.Title>
          {CurrentUser.getDisplayName() && `${CurrentUser.getDisplayName()} 👋`}
        </Text.Title>
      </header>

      <div className="dark:bg-grayblue-900/90 backdrop-blur-lg sticky z-20 top-0 py-3">
        <PanelSwitcher
          tabs={[t("homepage.slider.stats"), t("homepage.slider.trips")]}
          current={currentPanel}
          onChange={(val) => changePanel(val)}
        />
      </div>

      <div className="overflow-x-hidden h-max">
        <AnimatePresence mode="popLayout" initial={false}>
          {currentPanel === 0 ? (
            <motion.div
              key={currentPanel}
              initial={{ transform: "translateX(-50%)", opacity: 0 }}
              animate={{ transform: "translateX(0)", opacity: 1 }}
              exit={{ transform: "translateX(-50%)", opacity: 0 }}
              className="overflow-hidden"
            >
              <Stats
                allTrips={allTrips}
                setPanelFn={setCurrentPanel}
                data={calculateDataForStats(trips)}
              />
            </motion.div>
          ) : (
            <motion.div
              key={currentPanel}
              initial={{ transform: "translateX(50%)", opacity: 0 }}
              animate={{ transform: "translateX(0)", opacity: 1 }}
              exit={{ transform: "translateX(50%)", opacity: 0 }}
              className="overflow-hidden"
            >
              <Trips
                data={memoizedData}
                onDataChange={(newData) => {
                  setTrips(newData);
                }}
                onOpenTripDetails={(trip, key) => {
                  setModalOpened(true);
                  setModalContent({ trip: trip, key: key });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
}
