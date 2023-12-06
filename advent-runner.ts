import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { firstAndLastDigit } from "./2023/elf-digits/elf-digits";

async function processLineByLine() {
  const rl = readline.createInterface({ input, output });
  let sum = 0;

  for await (const line of rl) {
    const result = firstAndLastDigit(line);
    console.log({ line, result })
    sum += parseInt(result, 10);
    console.log({ sum })
  }
  console.log(sum);
}

processLineByLine();
