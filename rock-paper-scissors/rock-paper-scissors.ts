import z from "zod";

const player1Schema = z.enum(["A", "B", "C"]);
const player2Schema = z.enum(["X", "Y", "Z"]);
const strategySchema = z.tuple([player1Schema, player2Schema]);
const strategiesSchema = z.array(strategySchema);

type Strategy = z.infer<typeof strategySchema>;

const scoreMap = new Map<"X" | "Y" | "Z", 1 | 2 | 3>([
  ["X", 1],
  ["Y", 2],
  ["Z", 3],
]);

const playMap = new Map<
  "A" | "B" | "C" | "X" | "Y" | "Z",
  "ROCK" | "PAPER" | "SCISSOR"
>([
  ["A", "ROCK"],
  ["X", "ROCK"],
  ["B", "PAPER"],
  ["Y", "PAPER"],
  ["C", "SCISSOR"],
  ["Z", "SCISSOR"],
]);

const WIN_SCORE = 6;
const DRAW_SCORE = 3;
const LOSE_SCORE = 0;

function score([player1, player2]: Strategy) {
  if (!player1 || !player2) {
    throw new Error("Invalid Input");
  }
  const currentPlay1 = playMap.get(player1)!;
  const currentPlay2 = playMap.get(player2)!;
  const currentPlayScore = scoreMap.get(player2)!;
  if (currentPlay1 === "ROCK") {
    if (currentPlay2 === "PAPER") {
      return currentPlayScore + WIN_SCORE;
    } else if (currentPlay2 === "SCISSOR") {
      return currentPlayScore + LOSE_SCORE;
    }
    return currentPlayScore + DRAW_SCORE;
  }
  if (currentPlay1 === "PAPER") {
    if (currentPlay2 === "SCISSOR") {
      return currentPlayScore + WIN_SCORE;
    }
    if (currentPlay2 === "ROCK") {
      return currentPlayScore;
    }
    return currentPlayScore + DRAW_SCORE;
  }
  if (currentPlay2 === "ROCK") {
    return currentPlayScore + WIN_SCORE;
  }
  if (currentPlay2 === "PAPER") {
    return currentPlayScore;
  }
  return currentPlayScore + DRAW_SCORE;
}

function totalScore(strategyArray: Strategy[]): number {
  let sum = 0;
  for (let strategy of strategyArray) {
    sum += score(strategy);
  }
  return sum;
}

function calculateScore(input: string) {
  const strategyString = input.split("\n");
  const strategies = strategyString.map((str) => str.split(" ").map(str => str.trim()));
  console.log(strategies)
  const parsedStrategies = strategiesSchema.parse(strategies);
  return totalScore(parsedStrategies);
}

export { calculateScore };
