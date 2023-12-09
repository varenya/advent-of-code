import fs from "fs";

const [directionInput, nodeInput] = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n\n");

const directionsRegex = /(R|L)+/g;
const nodesRegex = /([A-Z]{3})/g;

const directions = directionInput.trim();
console.log({ d: directions.length });
const nodes = nodeInput.split("\n").map((str) => {
  return str.match(nodesRegex);
});

const childMappings = new Map<string, [string, string]>();

for (let [root, left, right] of nodes) {
  childMappings.set(root, [left, right]);
}

let left = (root: string) => childMappings.get(root)[0];
let right = (root: string) => childMappings.get(root)[1];

const destNode = "ZZZ";
function pathToZZZ(path: string) {
  let steps = 0,
    currentValue = "AAA",
    currPath = path;
  while (currentValue !== destNode) {
    for (let direction of currPath) {
      if (direction === "L") {
        currentValue = left(currentValue);
      } else {
        currentValue = right(currentValue);
      }
      steps++;
      console.log({ steps, curr: currentValue });
    }
  }
  return steps;
}

const result = pathToZZZ(directions);

console.log({ result });
