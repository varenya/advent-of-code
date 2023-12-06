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

const winMap = new Map<number, number>();

const cards = data.map(processCardLine);

for (let i = 0; i < cards.length; i++) {
  winMap.set(i + 1, 1);
}

function updateMap<K, V>(map: Map<K, V>, key: K, update: (v: V) => V) {
  const value = map.get(key);
  map.set(key, update(value));
  return map;
}

function calculatePoints(cards: Card[]): number {
  for (let i = 0; i < cards.length; i++) {
    let matchesFound = 0;
    const { actualNumbers, winning } = cards[i];
    for (let actual of actualNumbers) {
      if (winning.has(actual)) {
        matchesFound++;
      }
    }
    const copies = winMap.get(i + 1);
    let startCard = i + 2;
    let matches = matchesFound;
    while (matches > 0) {
      const value = winMap.get(startCard);
      winMap.set(startCard, value + copies);
      startCard++;
      matches--;
    }
  }
  let total = 0;
  for (let [_k, cards] of winMap) {
    total += cards;
  }
  return total;
}

const result = calculatePoints(cards);
console.log({ result });
