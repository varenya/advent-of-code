import fs from "fs";

const data = fs.readFileSync("./input-1.txt", "utf-8").trim();

const digits = /\d+/g;

function getNumbers(input: string): number[] {
  return input.match(digits).map((num) => parseInt(num, 10));
}

function calcDistance({
  pauseTime,
  totalTime,
}: {
  pauseTime: number;
  totalTime: number;
}) {
  return (totalTime - pauseTime) * pauseTime;
}

function getPossibleOutcomes({
  totalTime,
  distance,
}: {
  totalTime: number;
  distance: number;
}) {
  let possible = 0;
  for (let i = 1; i < totalTime - 1; i++) {
    if (calcDistance({ pauseTime: i, totalTime }) > distance) {
      possible++;
    }
  }

  return possible;
}

const [time, distance] = data.split("\n").map(getNumbers);
let result = 1;
for (let race = 0; race < time.length; race++) {
  result *= getPossibleOutcomes({
    totalTime: time[race],
    distance: distance[race],
  });
}

console.log({ time, distance, result });
