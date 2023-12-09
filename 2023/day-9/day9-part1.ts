import fs from "fs";

const oasis = fs.readFileSync("./input.txt", "utf-8").trim();

const digitsRegex = /-?\d+/g;

const histories = oasis
  .split("\n")
  .map((line) => line.match(digitsRegex).map((num) => parseInt(num, 10)));

function nextValue(input: number[]): number {
  let diffSet = new Set(input);
  let lastValues: number[] = [];
  let count = 0;
  while (diffSet.size !== 1) {
    for (let i = 1; i < input.length; i++) {
      input[i - 1] = input[i] - input[i - 1];
    }
    lastValues.push(input.pop());
    diffSet = new Set(input);
    count++;
  }
  lastValues.push([...diffSet][0]);
  return lastValues.reduce((acc, curr) => curr + acc, 0);
}

// const h = histories[histories.length - 1];
const predictions = histories.map((history) => nextValue(history));

// const h = [10, 13, 16, 21, 30, 45];

// console.log(histories);
// const result = nextValue(h);
const result = predictions.reduce((acc, curr) => acc + curr, 0);
// console.log({ predictions });

console.log({ result });
