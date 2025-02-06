import { readFileSync } from "node:fs";
import chalk from "chalk";

const ex1 = `
Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.
`;

const file = readFileSync(`${__dirname}/input.txt`, "utf8");

// test("SolveA-ex1", SolveA, ex1, "CABDFE");
// test("SolveA-file", SolveA, file, null);

test("SolveB-ex1", SolveB, ex1, 15);
// test("SolveB-file", SolveB, file, null);

function SolveA(input: string) {
  let lines = input.trim().split(/\r?\n/);

  let map = new Map<string, string[]>();

  for (let ln of lines) {
    // const m = Array.from(ln.matchAll(/step (.)/gi));
    // const steps = m.map((step) => step[1]);

    // const m = [...ln.matchAll(/step (.)/gi)];
    // const steps = m.map((step) => step[1]);

    const [prereq, key] = Array.from(
      ln.matchAll(/step (.)/gi),
      (step) => step[1]
    );

    let arr = map.get(key) ?? [];
    arr.push(prereq);
    map.set(key, arr);

    if (!map.has(prereq)) {
      map.set(prereq, []);
    }
  }

  map = sortMap(map);
  let result = "";
  let currKey = "";

  while (map.size !== 0) {
    for (let [key, value] of map.entries()) {
      if (value.length === 0) {
        currKey = key;
        result = result + key;
        map.delete(key);
        break;
      }
    }

    for (let [key, value] of map.entries()) {
      if (value.includes(currKey)) {
        value.splice(value.indexOf(currKey), 1);
      }
    }
  }

  return result;
}

function SolveB(input: string) {
  let lines = input.trim().split(/\r?\n/);
  let map = new Map<string, string[]>();

  for (let ln of lines) {
    const [prereq, key] = Array.from(
      ln.matchAll(/step (.)/gi),
      (step) => step[1]
    );

    let arr = map.get(key) ?? [];
    arr.push(prereq);
    map.set(key, arr);

    if (!map.has(prereq)) {
      map.set(prereq, []);
    }
  }

  console.log({ map });
  return 0;
}

function sortMap(graph: ReadonlyMap<string, string[]>): Map<string, string[]> {
  //   const a = Array.from(graph.keys()).sort();
  //   const resultMap = new Map<string, string[]>();
  //   for (const k of a) {
  //     resultMap.set(k, graph.get(k) as string[]);
  //   }
  //   return resultMap;

  const a = Array.from(graph.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return new Map(a);
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
