import fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const digits = /\d+/g;

type Card = {
  winning: Set<number>;
  actualNumbers: number[];
};

function processCardLine(line: string): Card {
  const cardLine = line.split(":")[1];
  const [winningStr, actualNumbersStr] = cardLine.split("|");
  let winning = new Set(
    winningStr.match(digits).map((digit) => parseInt(digit, 10)),
  );
  let actualNumbers = actualNumbersStr
    .match(digits)
    .map((digit) => parseInt(digit, 10));
  return { winning, actualNumbers };
}

const cards = data.map(processCardLine);

function calculatePoints(cards: Card[]): number {
  let total = 0;
  for (let card of cards) {
    let matchesFound = 0;
    const { actualNumbers, winning } = card;
    for (let actual of actualNumbers) {
      if (winning.has(actual)) {
        matchesFound++;
      }
    }
    let points = 0;
    if (matchesFound) {
      points = matchesFound === 1 ? 1 : Math.pow(2, matchesFound - 1);
    }
    total += points;
  }
  return total;
}

const result = calculatePoints(cards);
console.log({ result });
