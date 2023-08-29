import { test, expect } from "vitest";
import { strTruish } from "./checkings";

test("Empty string", () => {
  expect(strTruish("")).toEqual(false);
});
