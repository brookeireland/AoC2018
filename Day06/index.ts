import { readFileSync } from "node:fs";
import chalk from "chalk";

const ex1 = `
1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
`;

const file = readFileSync(`${__dirname}/input.txt`, "utf8");

// test("SolveA-ex1", SolveA, ex1, 17);
test("SolveA-file", SolveA, file, 3358);

// test("SolveB-ex1", SolveB, ex1, null);
// test("SolveB-file", SolveB, file, null);

function SolveA(input: string) {
  let lines = input
    .trim()
    .split(/\r?\n/)
    .map((ln) => ln.split(", ").map(Number));
  //up down left right
  let insideLines: number[][] = [];
  for (let [key, [c1, r1]] of lines.entries()) {
    let hasUp = false;
    let hasDown = false;
    let hasLeft = false;
    let hasRight = false;
    for (let [c2, r2] of lines) {
      if (c1 === c2 && r1 === r2) {
        continue;
      }
      if (c1 < c2) {
        hasRight = true;
      }
      if (c1 > c2) {
        hasLeft = true;
      }
      if (r1 < r2) {
        hasDown = true;
      }
      if (r1 > r2) {
        hasUp = true;
      }
    }
    if (hasUp && hasDown && hasLeft && hasRight) {
      insideLines.push([c1, r1, key]);
    }
  }
  let maxArea = 0;
  // for (let [c1, r1, key] of insideLines) {
  //   let insidePoints = countInsidePoints(c1, r1, key);
  //   if (insidePoints > maxArea) {
  //     maxArea = insidePoints;
  //   }
  // }
  const distancesCount: number[] = [0];
  for (let r = 0; r <= 352; r++) {
    for (let c = 0; c <= 352; c++) {
      let dist = findTheClosestOne(r, c);
      distancesCount[dist] = distancesCount[dist] + 1;
    }
  }
  console.log({ distancesCount });
  return distancesCount[0];

  function findTheClosestOne(r1: number, c1: number): number {
    let minDist = Infinity;
    let minDistChar: number[] = [];
    for (let [index, pt] of lines.entries()) {
      if (r1 === pt[1] && c1 === pt[0]) {
        return index;
      }
      let currDist = ManhattanDistance(r1, pt[0], c1, pt[1]);

      if (currDist < minDist) {
        minDist = currDist;
        minDistChar = [index];
      } else if (currDist === minDist) {
        minDistChar.push(-1);
      }
    }

    return minDistChar[0];
  }

  function countInsidePoints(c1: number, r1: number, key: number) {
    let dist = 1;
    let count = 1;

    while (true) {
      let foundKey = false;
      for (let c2 = c1 - dist; c2 <= c1 + dist; c2++) {
        if (key === findTheClosestOne(r1 - dist, c2)) {
          count++;
          foundKey = true;
        }
        if (key === findTheClosestOne(r1 + dist, c2)) {
          count++;
          foundKey = true;
        }
      }

      for (let r2 = r1 - (dist - 1); r2 <= r1 + (dist - 1); r2++) {
        if (key === findTheClosestOne(r2, c1 - dist)) {
          count++;
          foundKey = true;
        }
        if (key === findTheClosestOne(r2, c1 + dist)) {
          count++;
          foundKey = true;
        }
      }

      dist++;
      console.log(count, foundKey, dist);
      if (!foundKey) break;
    }
    console.log("--");
    return count;
  }
}

function ManhattanDistance(r1: number, r2: number, c1: number, c2: number) {
  return Math.abs(r2 - r1) + Math.abs(c2 - c1);
}

function SolveB(input: string) {
  let lines = input.trim().split(/\r?\n/);
  return lines.length;
}

function test(
  name: string,
  fn: Function,
  input: string,
  expected: number | string | null
) {
  let fence = "-".repeat(20);
  console.log(chalk.rgb(255, 192, 192)(fence + name + fence));
  const actual = fn(input);

  console.log({ actual, expected });
  if (actual === expected) {
    console.log(chalk.green(name, "success!"));
  } else {
    console.log(chalk.red(name, "fail :("));
    process.exit(1);
  }
}
