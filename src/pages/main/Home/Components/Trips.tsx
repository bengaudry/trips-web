import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getFirebaseDb } from "../../../../../server";

import { Cta, Modal, Text, TripDisplayer } from "@/components";
import { Checkbox } from "@/components/form";

import { capitalizeString, removeElementAtIndex } from "@/lib/functions";
import { Trip } from "@/types";
import { toast } from "react-toastify";

export function Trips(props: {
  data?: Array<Trip>;
  onDataChange: (newData: Array<Trip>) => void;
  onOpenTripDetails: (trip: Trip, key: number) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="pt-3">
      {props.data && props.data.length > 0 ? (
        <div>
          {props.data.map((trip, key) => (
            <TripDisplayer
              {...trip}
              showMoreOptBtn
              setModalOpened={(val: boolean) => {
                props.onOpenTripDetails(trip, key);
              }}
            />
          ))}
        </div>
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
