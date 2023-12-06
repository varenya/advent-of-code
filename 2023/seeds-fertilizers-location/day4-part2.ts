import fs from "fs";

const [initialSeeds, ...maps] = fs
  .readFileSync("./sample.txt", "utf-8")
  .trim()
  .split("\n\n");

const digits = /\d+/g;
const ranges = /(?<start>\d+) (?<range>\d+)/g;
const header = /(?<source>\w+)-to-(?<destination>\w+)/;

type Seed = {
  start: number;
  end: number;
};

const seeds: Seed[] = initialSeeds
  .match(ranges)
  .map((value) => {
    const [start, range] = value.split(" ").map((val) => parseInt(val, 10));
    return { start, end: start + range - 1 };
  })
  .sort((a, b) => a.start - b.start);

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
  return dest_source_range.sort((a, b) => a.src_start - b.src_start);
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
let minLocation = Number.MAX_VALUE;

const mappings = maps.map(processMap);

function mapValue(seeds: Seed[], ranges: Range[]) {
  let overlaps: Seed[] = [];
  for (let seed of seeds) {
    for (let range of ranges) {
      // console.log({ range });
      const rangeEnd = range.src_start + range.range - 1;
      if (range.src_start > seed.end) continue;
      if (rangeEnd < seed.start) continue;
      console.log({ seed });
      console.log({ start: range.src_start, end: rangeEnd });
      const offset = range.dest_start - range.src_start;
      let overlapStart = Math.max(seed.start, range.src_start);
      let overlapEnd = Math.min(seed.end, rangeEnd);
      // console.log({ overlapStart, overlapEnd });
      if (seed.start < overlapStart) {
        overlaps.push({ start: seed.start, end: overlapStart - 1 });
      }
      if (seed.end > overlapEnd) {
        overlaps.push({ start: seed.end + 1, end: overlapEnd });
      }
      overlaps.push({
        start: overlapStart + offset,
        end: overlapEnd + offset,
      });
    }
  }
  return overlaps.length === 0 ? seeds : overlaps;
}

const test: Seed[] = [
  { start: 57, end: 69 },
  { start: 81, end: 94 },
];
console.log({ test, ranges: mappings[2] });
const result = mapValue(test, mappings[2]);
// const result = mappings.reduce((acc, curr) => {
//   const result = mapValue(acc, curr);
//   console.log({ result });
//   return result;
// }, seeds);
console.log(result);

/*
    -------
       -------
 */
