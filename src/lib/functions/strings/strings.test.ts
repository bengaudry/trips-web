import { test, expect } from "vitest";
import { capitalizeString } from "./strings";

test("Capitalize Hello", () => {
  expect(capitalizeString("hello")).toEqual("Hello");
});
