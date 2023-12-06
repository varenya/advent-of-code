import { test , expect } from 'vitest';
import { calculateScore } from "./rock-paper-scissors";

const scoreList = [
  ["A", "Y"],
  ["B", "X"],
  ["C", "Z"],
];

test("based on strategy should give the correct result", () => {
  expect(calculateScore(scoreList)).toEqual(15);
});
