import fs from "fs";

const [directionInput, nodeInput] = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n\n");

const directionsRegex = /(R|L)+/g;
const nodesRegex = /([0-9A-Z]{3})/g;

const directions = directionInput.trim();
let nodes = nodeInput.split("\n").map((str) => {
  const result = str.match(nodesRegex);
  return result;
});
// console.log({ nodes, directions });

const startNodes = nodes
  .filter(([root, _left, _right]) => root.endsWith("A"))
  .map(([first]) => first);

console.log({ start: startNodes });

const childMappings = new Map<string, [string, string]>();

for (let [root, left, right] of nodes) {
  childMappings.set(root, [left, right]);
}

let left = (root: string) => childMappings.get(root)[0];
let right = (root: string) => childMappings.get(root)[1];

const destNode = "ZZZ";
const findGCD = (num1, num2) => {
  let a = Math.abs(num1);
  let b = Math.abs(num2);
  while (a && b && a !== b) {
    if (a > b) {
      [a, b] = [a - b, b];
    } else {
      [a, b] = [a, b - a];
    }
  }
  return a || b;
};
// function pathToZZZ(start: string[], path: string) {
//   let steps = 0,
//     currentValue = start,
//     currPath = path;
//   while (!currentValue.every((str) => str.endsWith("Z"))) {
//     for (let direction of currPath) {
//       currentValue = currentValue.map((node) =>
//         direction === "L" ? left(node) : right(node),
//       );
//       steps++;
//     }
//   }
//   return steps;
// }
function pathToZZZ(start: string, path: string) {
  let steps = 0,
    currentValue = start,
    currPath = path;
  while (!currentValue.endsWith("Z")) {
    for (let direction of currPath) {
      currentValue =
        direction === "L" ? left(currentValue) : right(currentValue);
      steps++;
    }
  }
  return steps;
}
const gcd = (a, b) => (a ? gcd(b % a, a) : b);

const lcm = (a, b) => (a * b) / gcd(a, b);

const counts = startNodes.map((start) => pathToZZZ(start, directions));
const result = counts.reduce(lcm);

// const gcd = result.reduce((acc, curr) => findGCD(acc, curr));
// const answer = result.map((num) => num / gcd);
//
// const pro = answer.reduce((acc, curr) => acc * curr, 1);

// const min = product / gcd;

// console.log({ pro });
console.log({ result });
