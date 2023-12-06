import fs from "fs";

const [initialSeeds, ...maps] = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n\n");

const digits = /\d+/g;
const header = /(?<source>\w+)-to-(?<destination>\w+)/;

const seeds = initialSeeds.match(digits).map((seed) => parseInt(seed, 10));
// console.log({ seeds });

function processMap(mapLine: string): Range[] {
  const [mapHeader, ...mappings] = mapLine.trim().split("\n");
  // console.log(mapHeader);
  const { source, destination } = mapHeader.match(header).groups;
  const dest_source_range = mappings.map((str) => {
    const [dest_start, src_start, range] = str
      .match(digits)
      .map((range) => parseInt(range, 10));
    return {
      dest_start,
      src_start,
      range,
    };
  });
  return dest_source_range;
}

type Range = {
  dest_start: number;
  src_start: number;
  range: number;
};

function getMappedValue(
  ranges: Range[],
  input: number,
  defaultValue: number,
): number {
  let result = defaultValue;
  for (let eachRange of ranges) {
    const { src_start, dest_start, range } = eachRange;
    if (input >= src_start && input < src_start + range) {
      const offset = input - src_start;
      result = dest_start + offset;
    }
  }
  return result;
}
const mappings = maps.map(processMap);

const locations = seeds.map((seed) =>
  mappings.reduce((acc, ranges) => {
    return getMappedValue(ranges, acc, acc);
  }, seed),
);

const minLocation = locations.reduce((acc, curr) => Math.min(acc, curr));

console.log(minLocation);
