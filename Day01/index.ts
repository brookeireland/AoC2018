import { readFileSync } from "node:fs";

const ex1 = "+1\n-2\n+3\n+1";
const ex2 = "+3\n+3\n+4\n-2\n-4";
const file = readFileSync(`${__dirname}/input.txt`, "utf8").trim();

//test("SolveA-ex1", SolveA, ex1, 3);
//test("SolveA-file", SolveA, file, 590);

test("SolveB-ex1", SolveB, ex1, 2);
test("SolveB-ex2", SolveB, ex2, 10);
test("SolveB-file", SolveB, file, 590); //48173 too low

function SolveA(input: string) {
  let val = input.split("\n");
  let freq = 0;
  let i = 0;
  while (true) {
    let n = Number.parseInt(val[i]);
    freq = freq + n;
    i++;
    if (i >= val.length) break;
  }
  return freq;
}

function SolveB(input: string) {
  let val = input.split("\n");
  let freq = 0;
  let arr: number[] = [];
  let i = 0;
  while (true) {
    let n = Number.parseInt(val[i]);
    freq = freq + n;
    const exists = arr.find((v) => v === freq);
    if (!!exists) {
      return exists;
    }
    arr.push(freq);
    i++;
    if (i >= val.length) {
      i = 0;
    }
  }
}

function test(name: string, fn: Function, input: string, expected: number) {
  const actual = fn(input);
  console.log({ name, actual, expected, success: actual === expected });
}
