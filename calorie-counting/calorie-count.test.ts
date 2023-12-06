import { expect, test } from "vitest";
import { getElfWithMaxCalories } from "./calorie-count";

const sampleInput = `
	1000
	2000
	3000

	4000

	5000
	6000

	7000
	8000
	9000

	10000
`;

test("get max calories of the elf", () => {
  expect(getElfWithMaxCalories(sampleInput)).toEqual(24000);
});
