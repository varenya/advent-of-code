import fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const input = data.map((str) => str.split(""));

const visited: boolean[][] = new Array(input.length)
  .fill(false)
  .map((val) => new Array(val.length).fill(false));

const digitRegex = /[0-9]/;

const symbols = /[$*#+-/]/;
function isDigit(input: string): boolean {
  return digitRegex.test(input);
}

function isSymbol(input: string): boolean {
  return input !== "." && !digitRegex.test(input);
}

function isGear(input: string): boolean {
  return input === "*";
}

function engineNumbers(engine: string[][]) {
  const rows = engine.length;
  const cols = engine[0].length;
  let sum = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const validNums: string[] = [];
      if (!visited[i][j] && isGear(engine[i][j])) {
        let num1 = visitMatrix(engine, i - 1, j);
        let num2 = visitMatrix(engine, i + 1, j);
        let num3 = visitMatrix(engine, i, j + 1);
        let num4 = visitMatrix(engine, i, j - 1);
        let num5 = visitMatrix(engine, i - 1, j - 1);
        let num6 = visitMatrix(engine, i - 1, j + 1);
        let num7 = visitMatrix(engine, i + 1, j - 1);
        let num8 = visitMatrix(engine, i + 1, j + 1);
        if (num1) validNums.push(num1);
        if (num2) validNums.push(num2);
        if (num3) validNums.push(num3);
        if (num4) validNums.push(num4);
        if (num5) validNums.push(num5);
        if (num6) validNums.push(num6);
        if (num7) validNums.push(num7);
        if (num8) validNums.push(num8);
      }
      if (validNums.length === 2) {
        const result = validNums
          .map((num) => parseInt(num, 10))
          .reduce((acc, curr) => acc * curr, 1);
        sum += result;
      }
    }
  }
  return sum;
}

function visitMatrix(engine: string[][], i = 0, j = 0): string {
  const rows = engine.length;
  const cols = engine[0].length;
  if (i < 0 || j < 0 || j >= cols || i >= rows) return "";
  if (visited[i][j]) return "";
  let number = engine[i][j];
  if (!isDigit(number)) return "";
  let forward = j + 1;
  let backward = j - 1;
  visited[i][j] = true;
  while (forward < cols && isDigit(engine[i][forward])) {
    visited[i][forward] = true;
    number += engine[i][forward++];
  }
  while (backward >= 0 && isDigit(engine[i][backward])) {
    visited[i][backward] = true;
    number = engine[i][backward--] + number;
  }
  return number;
}
console.log({ input });
const result = engineNumbers(input);
console.log({ result });
