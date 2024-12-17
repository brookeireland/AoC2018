import { readFileSync } from "node:fs";

const ex1 = `
`;
const ex2 = `
`;
const file = readFileSync(`${__dirname}/input.txt`, "utf8");

//test("SolveA-ex1", SolveA, ex1, null);
// test("SolveA-ex2", SolveB, ex2, null);
//test("SolveA-file", SolveA, file, null);

// test("SolveB-ex1", SolveB, ex1, null);
// test("SolveB-ex2", SolveB, ex2, null);
// test("SolveB-file", SolveB, file, null);

function SolveA(input: string) {
  let lines = input.trim().split(/\r?\n/);
  return lines.length;
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
  const actual = fn(input);
  console.log({ name, actual, expected, success: actual === expected });
}