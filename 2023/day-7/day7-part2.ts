import fs from "fs";

const camelCardsInput = fs.readFileSync("./input.txt", "utf-8").trim();

const parseRegex = /(?<hand>[A-Z1-9]+) (?<bid>\d+)/;

type Bid = {
  hand: string;
  bid: number;
};
const result: Bid[] = camelCardsInput.split("\n").map((line) => {
  const { hand, bid } = line.match(parseRegex).groups;
  return { hand, bid: +bid };
});

type Cards =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

const cardRank: { [key in Cards]: number } = {
  A: 14,
  K: 13,
  Q: 12,
  J: 1,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};

type Hand =
  | "FIVE_OF_A_KIND"
  | "FOUR_OF_A_KIND"
  | "FULL_HOUSE"
  | "THREE_OF_A_KIND"
  | "TWO_PAIR"
  | "ONE_PAIR"
  | "HIGH_CARD";

const handRank: { [key in Hand]: number } = {
  FIVE_OF_A_KIND: 7,
  FOUR_OF_A_KIND: 6,
  FULL_HOUSE: 5,
  THREE_OF_A_KIND: 4,
  TWO_PAIR: 3,
  ONE_PAIR: 2,
  HIGH_CARD: 1,
};

function calcHand(hand: string): Hand {
  const freqMap = new Map<string, number>();
  for (let card of hand) {
    const current = freqMap.get(card) || 0;
    freqMap.set(card, current + 1);
  }
  const jokers = freqMap.get("J") || 0;

  freqMap.delete("J");

  const freqArray = [...freqMap];

  freqArray.sort(([_card, freqA], [_, freqB]) => freqB - freqA);

  const frequencies = freqArray.map(([_, freq]) => freq);

  const maxFreq = frequencies[0] + jokers;
  if (maxFreq === 5 || jokers === 5) return "FIVE_OF_A_KIND";
  if (maxFreq === 4) return "FOUR_OF_A_KIND";
  if (maxFreq === 3 && frequencies[1] === 2) return "FULL_HOUSE";
  if (maxFreq === 3 && frequencies[1] === 1 && frequencies[2] === 1)
    return "THREE_OF_A_KIND";
  if (maxFreq === 2 && frequencies[1] === 2 && frequencies[2] === 1)
    return "TWO_PAIR";
  if (
    maxFreq === 2 &&
    frequencies[1] === 1 &&
    frequencies[2] === 1 &&
    frequencies[3] === 1
  )
    return "ONE_PAIR";
  return "HIGH_CARD";
}

function compare(bid1: Bid, bid2: Bid) {
  const hand1 = calcHand(bid1.hand);
  const hand2 = calcHand(bid2.hand);
  const diff = handRank[hand1] - handRank[hand2];
  if (diff !== 0) return diff;
  for (let i = 0; i < bid1.hand.length; i++) {
    const handInput1 = bid1.hand[i];
    const handInput2 = bid2.hand[i];
    if (cardRank[handInput1] === cardRank[handInput2]) continue;
    if (cardRank[handInput1] !== cardRank[handInput2]) {
      return cardRank[handInput1] - cardRank[handInput2];
    }
    return 0;
  }
}

const sortedBids = result.sort(compare);

const totalWinnings = sortedBids.reduce((total, curr, currentIndex) => {
  return total + curr.bid * (currentIndex + 1);
}, 0);
console.log(totalWinnings);
