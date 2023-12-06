import z from "zod";

const player1Schema = z.enum(["A", "B", "C"]);
const player2Schema = z.enum(["X", "Y", "Z"]);
const strategySchema = z.tuple([player1Schema, player2Schema]);
const strategiesSchema = z.array(strategySchema);

type Game = "ROCK" | "PAPER" | "SCISSOR";

const WIN_SCORE = 6;
const DRAW_SCORE = 3;
const LOSE_SCORE = 0;

type Strategy = z.infer<typeof strategySchema>;

const resultScoreMap = new Map<"X" | "Y" | "Z", 6 | 3 | 0>([
  ["X", LOSE_SCORE],
  ["Y", DRAW_SCORE],
  ["Z", WIN_SCORE],
]);

const playScoreMap = new Map<Game, 1 | 2 | 3>([
  ["ROCK", 1],
  ["PAPER", 2],
  ["SCISSOR", 3],
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

const winMap = new Map<Game, Game>([
  ["ROCK", "PAPER"],
  ["SCISSOR", "ROCK"],
  ["PAPER", "SCISSOR"],
]);

const loseMap = new Map<Game, Game>([
  ["PAPER", "ROCK"],
  ["ROCK", "SCISSOR"],
  ["SCISSOR", "PAPER"],
]);

function score([player1, gameResult]: Strategy) {
  if (!player1 || !gameResult) {
    throw new Error("Invalid Input");
  }
  const currentPlay1 = playMap.get(player1)!;
  const gameScore = resultScoreMap.get(gameResult)!;
  const winGameScore = playScoreMap.get(winMap.get(currentPlay1)!)!;
  const loseGameScore = playScoreMap.get(loseMap.get(currentPlay1)!)!;
  const drawScore = playScoreMap.get(currentPlay1)!;
  switch (gameResult) {
    case "X":
      return gameScore + loseGameScore;
    case "Y":
      return gameScore + drawScore;
    case "Z":
      return gameScore + winGameScore;
    default:
      const _no_use: never = gameResult;
      return _no_use;
  }
}

function totalScore(strategyArray: Strategy[]): number {
  let sum = 0;
  for (let strategy of strategyArray) {
    const currentScore = score(strategy);
    sum += currentScore;
  }
  return sum;
}

function calculateScore(input: string) {
  const strategyString = input.split("\n");
  const strategies = strategyString.map((str) =>
    str.split(" ").map((str) => str.trim())
  );
  const parsedStrategies = strategiesSchema.parse(strategies);
  return totalScore(parsedStrategies);
}

export { calculateScore };
