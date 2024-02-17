import { Trip } from "@/types";
import { sortByOccurencesNumber } from "./array";

export function SortMostUsedDestinations(
  trips: Array<Trip> | undefined,
  options?: { keepDoubles?: boolean }
): Array<string> {
  if (trips === undefined || trips.length === 0) return [];

  const destinations = [];

  for (let i = 0; i <= trips.length - 1; i++) {
    const trip = trips[i];
    console.log("trip", trip);

    if (trip.from) {
      destinations.push(trip.from.replaceAll("-", " ").toLowerCase());
    }

    if (trip.to) {
      destinations.push(trip.to.replaceAll("-", " ").toLowerCase());
    }
  }

  return sortByOccurencesNumber(destinations, {
    keepDoubles: options?.keepDoubles,
  });
}
