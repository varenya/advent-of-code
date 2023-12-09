import fs from "fs";

const oasis = fs.readFileSync("./input.txt", "utf-8").trim();

const digitsRegex = /-?\d+/g;

const histories = oasis
  .split("\n")
  .map((line) => line.match(digitsRegex).map((num) => parseInt(num, 10)));

function nextValue(input: number[]): number {
  let diffSet = new Set(input);
  let firstValues: number[] = [];
  while (diffSet.size !== 1) {
    firstValues.unshift(input[0]);
    for (let i = 1; i < input.length; i++) {
      input[i - 1] = input[i] - input[i - 1];
    }
    input.pop();
    diffSet = new Set(input);
  }
  firstValues.unshift([...diffSet][0]);
  // console.log({ firstValues });
  return firstValues.reduce((acc, curr) => curr - acc, 0);
}

// const h = histories[histories.length - 1];
const predictions = histories.map((history) => nextValue(history));

// const h = [10, 13, 16, 21, 30, 45];

// console.log(histories);
// const result = nextValue(h);
const result = predictions.reduce((acc, curr) => acc + curr, 0);
// console.log({ predictions });

console.log({ result });
