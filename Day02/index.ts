import { readFileSync } from "node:fs";

const ex1 = `
abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab
`;
const ex2 = `
abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz
`;
const file = readFileSync(`${__dirname}/input.txt`, "utf8");

//test("SolveA-ex1", SolveA, ex1, 12);
// test("SolveA-ex2", SolveB, ex2, null);
//test("SolveA-file", SolveA, file, null);

//test("SolveB-ex1", SolveB, ex1, null);
test("SolveB-ex2", SolveB, ex2, "fgij");
test("SolveB-file", SolveB, file, null);

function SolveA(input: string) {
  let lines = input.trim().split(/\r?\n/);
  let i = 0;
  let twice = 0;
  let thrice = 0;

  for (i = 0; i >= lines.length; i++) {
    let m = new Map();
    for (let c of lines[i]) {
      m.set(c, m.get(c) + 1 || 1);
    }
    let double = false;
    let triple = false;
    for (let [k, v] of m) {
      if (v === 2) double = true;
      if (v === 3) triple = true;
    }
    if (double) twice++;
    if (triple) thrice++;
  }
  return twice * thrice;

  // while (true) {
  //   let m = new Map();
  //   for (let c of lines[i]) {
  //     m.set(c, m.get(c) + 1 || 1);
  //   }
  //   let double = false;
  //   let triple = false;
  //   for (let [k, v] of m) {
  //     if (v === 2) double = true;
  //     if (v === 3) triple = true;
  //   }
  //   if (double) twice++;
  //   if (triple) thrice++;
  //   i++;
  //   if (i >= lines.length) break;
  // }
}

function SolveB(input: string) {
  let lines = input.trim().split(/\r?\n/);
  let diff = 0;
  for (let [i, ln] of lines.entries()) {
    for (let [j, ln] of lines.entries()) {
      if(ln[i])
    }
  }
}

function strcmp(a: string, b: string) {
  let newStr = "";
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      if(diff === 1) return null;
      diff++;
      
    } else {
      newStr += a[i];
    }
  }
  if (diff === 1) return newStr;
  return null;
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
