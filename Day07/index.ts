import { readFileSync } from "node:fs";
import { aocTest } from "../utils/aoc-test";
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

aocTest("SolveA-ex1", SolveA, ex1, "CABDFE");
// aocTest("SolveA-file", SolveA, file, null);

// aocTest("SolveB-ex1", (input) => SolveB(input, 2, 0), ex1, 15);
// aocTest("SolveB-file", (input) => SolveB(input, 5, 60), file, null);

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
        map.delete(key); //cleanup
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

function SolveB(input: string, workers: number, seconds: number) {
  //COMMENT FOR DANNY
  //refactor using promises
  //extract code into funcs for readability
  //add logging utility

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

  map = sortMap(map);

  type Worker = [string, number];
  let timeSpent = 0;
  const workersArray: Worker[] = [];

  // let iterationCount = 100;
  while (map.size !== 0 || workersArray.length !== 0) {
    // if (--iterationCount <= 0) break;
    // const beforeMap = structuredClone(map);

    if (workersArray.length < workers) {
      for (let [key, value] of map.entries()) {
        if (value.length <= 0) {
          if (workersArray.length < workers) {
            workersArray.push([key, seconds + (key.charCodeAt(0) - 64)]);
            map.delete(key); //cleanup

            // console.log("add worker", key, timeSpent);
          }
        }
      }
    }
    let deletions: Worker[] = [];
    timeSpent++;
    for (let w of workersArray) {
      w[1]--;
      // console.log("decrease time", w, timeSpent);
      if (w[1] <= 0) {
        for (let [key, value] of map.entries()) {
          if (value.includes(w[0])) {
            value.splice(value.indexOf(w[0]), 1);
          }
        }
        deletions.push(w);
      }
    }
    for (let w of deletions) {
      workersArray.splice(workersArray.indexOf(w), 1);
      // console.log("pop worker", w[0], timeSpent);
    }

    // console.log({ beforeMap, map, currKey, workersArray });
  }

  //each second is one iteration of a loop
  //which goes first
  //assign to a worker with a time (60+#)
  //if theres another worker get the next one
  //else wait

  //worker: id, step

  return timeSpent;
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
