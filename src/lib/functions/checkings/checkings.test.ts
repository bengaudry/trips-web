import { expect } from "vitest";
import { checkTripBeforeSending } from "../addTrip/addTrip";

expect(checkTripBeforeSending({ duration: 0, length: 0 })).toBe(false)