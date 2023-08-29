import { test, expect } from "vitest";
import { generateNewVersion } from "../src/lib/functions";

test("0.0.0", () => {
  expect(generateNewVersion("0.0.0")).toBe("0.0.1");
});

test("0.0.9", () => {
  expect(generateNewVersion("0.0.9")).toBe("0.1.0");
});

test("0.9.0", () => {
  expect(generateNewVersion("0.9.0")).toBe("0.9.1");
});

test("0.9.9", () => {
  expect(generateNewVersion("0.9.9")).toBe("1.0.0");
});

test("1.9.9", () => {
  expect(generateNewVersion("1.9.9")).toBe("2.0.0");
});

test("1.1.1", () => {
  expect(generateNewVersion("1.1.1")).toBe("1.1.2");
});

test("9.9.9", () => {
  expect(generateNewVersion("9.9.9")).toBe("10.0.0");
});