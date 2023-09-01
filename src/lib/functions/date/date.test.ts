import { expect, test } from "vitest";
import { addZeroBefore } from ".";

test("Format 8 with a zero", () => {
  expect(addZeroBefore(8)).toEqual("08");
});

test("Format 12 should return same", () => {
  expect(addZeroBefore(12)).toEqual("12");
});
