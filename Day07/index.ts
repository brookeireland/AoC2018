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

aocTest("SolveB-ex1", (input) => SolveB(input, 2, 0), ex1, 15);
// aocTest("SolveB-file", (input) => SolveB(input, 5, 60), file, null);

function SolveA(input: string) {
  let lines = input.trim().split(/\r?\n/);
  const map = parseLines(lines);
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

function SolveB(input: string, workerLimit: number, seconds: number) {
  //refactor using promises
  //add logging utility

  let lines = input.trim().split(/\r?\n/);
  const map = parseLines(lines);
  type Worker = { step: string; time: number };
  let timeSpent = 0;
  const workers: Worker[] = [];

  while (map.size !== 0 || workers.length !== 0) {
    const readySteps = getReadySteps(map);
    //assign worker to step
    for (let step of readySteps) {
      if (workers.length < workerLimit) {
        workers.push({ step, time: seconds + (step.charCodeAt(0) - 64) });
        map.delete(step);
      }
    }

    // advance time
    timeSpent++;
    for (let w of workers) {
      w.time--;
    }

    const idleWorkers = workers.filter((w) => w.time <= 0);

    //remove step pre reqs
    for (let w of idleWorkers) {
      for (let [key, value] of map.entries()) {
        if (value.includes(w.step)) {
          value.splice(value.indexOf(w.step), 1);
        }
      }
    }

    //remove worker
    for (let w of idleWorkers) {
      workers.splice(workers.indexOf(w), 1);
    }
  }

  return timeSpent;
}

function getReadySteps(map: Map<string, string[]>): string[] {
  return Array.from(
    map
      .entries()
      .filter((x) => x[1].length <= 0)
      .map((x) => x[0])
  );
}

function parseLines(lines: string[]) {
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

  return sortMap(map);
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
