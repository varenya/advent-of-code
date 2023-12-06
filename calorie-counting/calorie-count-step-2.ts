import { createMaxHeap } from "./max-heap";

function getTotalCalories(calories: string) {
  const calorieCountPerDay = calories
    .split("\n")
    .filter((cal) => Boolean(cal.trim()))
    .map((cal) => parseInt(cal.trim(), 10));
  return calorieCountPerDay.reduce((acc, curr) => curr + acc, 0);
}

function getElfWithMaxCalories(input: string): number {
  const elfGroups = input.split("\n\n");
  const elfCalories = elfGroups.map(getTotalCalories);
  const calorieMaxHeap = createMaxHeap<number>();
  for (let totalCollectedCalorie of elfCalories) {
    calorieMaxHeap.insert(totalCollectedCalorie);
  }
  const firstMax = calorieMaxHeap.extractMax();
  const secondMax = calorieMaxHeap.extractMax();
  const thirdMax = calorieMaxHeap.extractMax();
  return firstMax + secondMax + thirdMax
}

export { getElfWithMaxCalories };
