import fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const map = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const digit = /one|two|three|four|five|six|seven|eight|nine|\d/g;

function firstAndLastDigit(input: string) {
  let first = "";
  let last = "";
  for (let i = 0; i < input.length; i++) {
    first += input[i];
    const digitMatch = first.match(digit);
    if (digitMatch && digitMatch.length !== 0) {
      first = first.match(digit)[0];
      first = map[first] ? map[first] : first;
      break;
    }
  }
  for (let i = input.length - 1; i >= 0; i--) {
    last = input[i] + last;
    const digitMatch = last.match(digit);
    if (digitMatch && digitMatch.length !== 0) {
      last = last.match(digit)[0];
      last = map[last] ? map[last] : last;
      break;
    }
  }
  return `${first}${last}`;
}

let sum = 0;

for (let line of data) {
  const out = firstAndLastDigit(line);
  console.log(`${line}: ${out}`);
  sum += parseInt(out, 10);
}

console.log(sum);

export { firstAndLastDigit };
