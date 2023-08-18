import { Trip, StatsData } from "../../../types/types";
import { MAX_KMS_BEFORE_LICENSE } from "../../constants";

export function calculateDataForStats(trips?: Trip[]): StatsData {
  // Define a basic object to return
  let r: StatsData = {
    totalKms: 0,
    totalDrivingTime: {
      nb: 0,
      unit: "hrs",
    },
    tripsByRoadType: {
      countryside: 0,
      expressway: 0,
      highway: 0,
      city: 0,
    },
  };

  // Initialize a default duration of 0 minutes
  // that will be increased in the map()
  let mins = 0;

  // Map the object trips only once
  trips?.map((trip) => {
    // Calculate the nb of kilometers of this trip
    // and add it to the default value
    if (!isNaN(trip.length)) {
      r.totalKms += trip.roundTrip ? trip.length * 2 : trip.length;
    }

    // Calculate the duration of this trip
    // and add it to the default value
    if (!isNaN(trip.duration)) {
      mins += trip.roundTrip ? trip.duration * 2 : trip.duration;
    }

    // Increase the number of trips by category
    if (trip.roadType?.includes("[")) {
      let roadType: number[] = JSON.parse(trip.roadType as string);
      if (roadType.includes(0)) {
        r.tripsByRoadType.countryside++;
      }
      if (roadType.includes(1)) {
        r.tripsByRoadType.expressway++;
      }
      if (roadType.includes(2)) {
        r.tripsByRoadType.highway++;
      }
      if (roadType.includes(3)) {
        r.tripsByRoadType.city++;
      }
    }
  });

  // Convert minutes to hours if necessary
  if (mins >= 60) {
    r.totalDrivingTime = { nb: Math.floor(mins / 60), unit: "hrs" };
  } else {
    r.totalDrivingTime = { nb: Math.floor(mins), unit: "min" };
  }

  if (r.totalKms >= MAX_KMS_BEFORE_LICENSE) {
    localStorage.setItem("max_kms_reached", "true");
  } else {
    localStorage.removeItem("max_kms_reached");
  }
  return r;
}
