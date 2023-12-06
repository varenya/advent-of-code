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
  let first = 0;
  let last = totalTime - 1;
  for (let i = 0; i < totalTime; i++) {
    if (calcDistance({ pauseTime: i, totalTime }) > distance) {
      first = i;
      break;
    }
  }
  for (let i = totalTime; i >= 0; i--) {
    if (calcDistance({ pauseTime: i, totalTime }) > distance) {
      last = i;
      break;
    }
  }

  return last - first + 1;
}
const [time, distance] = data.split("\n").map(getNumbers);
let result = 1;
for (let race = 0; race < time.length; race++) {
  result *= getPossibleOutcomes({
    totalTime: time[race],
    distance: distance[race],
  });
}

console.log(result);
