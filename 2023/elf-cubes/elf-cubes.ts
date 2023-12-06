import fs from "fs";
import chalk from "chalk";

const data = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const gameId = /Game (?<game>\d+)/;
const greenCount = /(?<green>\d+) green/;
const redCount = /(?<red>\d+) red/;
const blueCount = /(?<blue>\d+) blue/;

const colors: [string, RegExp][] = [
  ["red", redCount],
  ["green", greenCount],
  ["blue", blueCount],
];

type ColorCount = {
  red: number;
  green: number;
  blue: number;
};
const maxCounts = {
  red: 12,
  green: 13,
  blue: 14,
};

let possibleIds: number[] = [];

function printColor(gameId: string, { red, green, blue }: ColorCount) {
  console.log(
    `Max: ${gameId} -> Red : ${chalk.redBright(
      maxCounts.red,
    )} , Green : ${chalk.greenBright(
      maxCounts.green,
    )}, Blue : ${chalk.blueBright(maxCounts.blue)}`,
  );
  console.log(
    `GameId: ${gameId} -> Red : ${chalk.redBright(
      red,
    )} , Green : ${chalk.greenBright(green)}, Blue : ${chalk.blueBright(blue)}`,
  );
}

for (let line of data) {
  const id = line.match(gameId).groups.game;
  const sets = line.trim().split(";");
  const gameCount = { red: 0, green: 0, blue: 0 };
  // console.log(line);

  for (let set of sets) {
    for (let [color, colorRegex] of colors) {
      const currMatch = set.match(colorRegex);
      const count = currMatch
        ? parseInt(currMatch.groups[color] || "0", 10)
        : 0;
      gameCount[color] = Math.max(gameCount[color], count);
    }
  }
  if (
    gameCount.red <= maxCounts.red &&
    gameCount.green <= maxCounts.green &&
    gameCount.blue <= maxCounts.blue
  ) {
    possibleIds.push(parseInt(id, 10));
  }
}

const sum = possibleIds.reduce((acc, curr) => curr + acc, 0);

console.log(sum);
