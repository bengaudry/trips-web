import { test, expect } from "vitest";
import { strTruish } from "./checkings";

test("Empty string", () => {
  expect(strTruish("")).toEqual(false);
});

test("Undefined string", () => {
  expect(strTruish(undefined)).toEqual(false);
});

test("Null string", () => {
  expect(strTruish(null)).toEqual(false);
});

test("Random string", () => {
  expect(strTruish("Hello world")).toEqual(true);
});
