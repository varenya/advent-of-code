function getTotalCalories(calories: string) {
  const calorieCountPerDay = calories
    .split("\n")
    .filter((cal) => Boolean(cal.trim()))
    .map((cal) => parseInt(cal.trim(), 10));
  return calorieCountPerDay.reduce((acc, curr) => curr + acc, 0);
}

function getMax(arr: number[]): number {
  return arr.reduce((max, curr) => Math.max(curr, max), Number.MIN_VALUE);
}

function getElfWithMaxCalories(input: string): number {
  const elfGroups = input.split("\n\n");
  const elfCalories = elfGroups.map(getTotalCalories);
  return getMax(elfCalories);
}

export { getElfWithMaxCalories };
