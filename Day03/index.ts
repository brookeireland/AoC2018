import { readFileSync } from "node:fs";

const ex1 = `
#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2
`;

const file = readFileSync(`${__dirname}/input.txt`, "utf8");

//test("SolveA-ex1", SolveA, ex1, 4);
//test("SolveA-file", SolveA, file, null);

//test("SolveB-ex1", SolveB, ex1, 3);
//test("SolveB-file", SolveB, file, null);

function SolveA(input: string) {
  let lines = input.trim().split(/\r?\n/);

  const x = lines.map((m) => m.match(/\d+/g)!.map(Number));

  //init grid
  let grid: (string | number)[][] = [];
  for (let i = 0; i < 1000; i++) {
    grid.push([]);
    for (let j = 0; j < 1000; j++) {
      grid[i].push(".");
    }
  }

  for (let ln of x) {
    const [claim, leftOffset, topOffset, width, height] = ln;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let val = grid[topOffset + j][leftOffset + i];
        if (val === ".") {
          grid[topOffset + j][leftOffset + i] = claim;
        } else {
          grid[topOffset + j][leftOffset + i] = "X";
        }
      }
    }
  }
  let overlaps = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      let val = grid[i][j];

      if (val === "X") {
        overlaps++;
      }
    }
  }

  return { overlaps };
}

function SolveB(input: string) {
  let lines = input.trim().split(/\r?\n/);

  const x = lines.map((m) => m.match(/\d+/g)!.map(Number));

  //init flags
  let flags: Boolean[] = [];
  flags.push(false);
  for (let ln of x) {
    flags.push(true);
  }

  //init grid
  let grid: (string | number)[][] = [];
  for (let i = 0; i < 1000; i++) {
    grid.push([]);
    for (let j = 0; j < 1000; j++) {
      grid[i].push(".");
    }
  }

  for (let ln of x) {
    const [claim, leftOffset, topOffset, width, height] = ln;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let val = grid[topOffset + j][leftOffset + i];
        if (val === ".") {
          grid[topOffset + j][leftOffset + i] = claim;
        } else {
          grid[topOffset + j][leftOffset + i] = "X";
          flags[val] = false;
          flags[claim] = false;
        }
      }
    }
  }
  let overlaps = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      let val = grid[i][j];

      if (val === "X") {
        overlaps++;
      }
    }
  }
  return flags.findIndex((e) => e === true);
}

function test(
  name: string,
  fn: Function,
  input: string,
  expected: number | string | null
) {
  const actual = fn(input);
  console.log({ name, actual, expected, success: actual === expected });
}
