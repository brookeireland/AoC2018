import { readFileSync } from "node:fs";
import chalk from "chalk";

const ex1 = `aA`;
const ex2 = `abBA`;
const ex3 = `aabAAB`;
const ex4 = `abAB`;
const ex5 = `dabAcCaCBAcCcaDA`;
const file = readFileSync(`${__dirname}/input.txt`, "utf8");

// test("SolveA-ex1", SolveA, ex1, 0);
// test("SolveA-ex2", SolveA, ex2, 0);
// test("SolveA-ex3", SolveA, ex3, 6);
// test("SolveA-ex4", SolveA, ex4, 4);
// test("SolveA-ex5", SolveA, ex5, 10);

// test("SolveA-file", SolveA, file, null);

// test("SolveB-ex1", SolveB, ex5, 4);
// test("SolveB-ex2", SolveB, ex2, null);
test("SolveB-file", SolveB, file, null);

//if str1.toUppercase == str2.toUppercase && str1 !== str2

function SolveA(input: string) {
  let polymer = input.trim();
  let loopAgain = true;
  do {
    loopAgain = false;
    for (let i = 0; i < polymer.length - 1; i++) {
      let str1 = polymer[i];
      let str2 = polymer[i + 1];
      if (str1.toUpperCase() == str2.toUpperCase() && str1 !== str2) {
        let newStr = polymer.slice(0, i) + polymer.slice(i + 2, polymer.length);
        polymer = newStr;
        loopAgain = true;
      }
    }
  } while (loopAgain);
  return polymer.length;
}

function SolveB(input: string) {
  let polymer = input.trim();
  let shortest = Number.POSITIVE_INFINITY;
  for (let i = 0; i < 26; i++) {
    let newStr = polymer.replaceAll(String.fromCharCode(i + 97), "");
    let newStr2 = newStr.replaceAll(
      String.fromCharCode(i + 97).toUpperCase(),
      ""
    );
    let units = SolveA(newStr2);
    if (units < shortest) shortest = units;
  }
  return shortest;
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
