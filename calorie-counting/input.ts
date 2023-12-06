import fs from "fs";
import path from "path";
import { getElfWithMaxCalories } from "./calorie-count-step-2";

const filePath = path.join(__dirname, "./input.txt");

const input = fs.readFileSync(filePath).toString().trim();

console.log({ output: getElfWithMaxCalories(input) });
