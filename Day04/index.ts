import { readFileSync } from "node:fs";

const ex1 = `
[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up
`;
const ex2 = `
`;
const file = readFileSync(`${__dirname}/input.txt`, "utf8");

//test("SolveA-ex1", SolveA, ex1, 240);
// test("SolveA-ex2", SolveB, ex2, null);
test("SolveA-file", SolveA, file, null); //63153 too high

// test("SolveB-ex1", SolveB, ex1, null);
// test("SolveB-ex2", SolveB, ex2, null);
// test("SolveB-file", SolveB, file, null);

function SolveA(input: string) {
  let lines = input.trim().split(/\r?\n/);
  lines.sort();

  let records = lines.map((ln) => {
    //match anything in the square brackets and all text after
    let y = ln.match(/\[([^\]]+)\] (.+)/)!;
    let date = new Date(y![1]);
    let msg = y[2];
    //match the guard number
    let id = msg.match(/#(\d+)/)?.[1];
    let asleep = msg === "falls asleep";
    let awake = msg === "wakes up";
    return { date, id, asleep, awake };
  });

  //If I didn't sort lines above
  //records.sort((a, b) => a.date.getTime() - b.date.getTime());

  let timeAsleep = initializeTimeAsleep(records);
  let minutesAsleep = initializeMinutesAsleep();
  updateIds(records);
  setTimeAsleep(records, timeAsleep);
  let sleepiestGuard = getMaxOfMap(timeAsleep);
  setMinutesAsleep(records, sleepiestGuard, minutesAsleep);

  return Number(sleepiestGuard) * Number(getMaxOfMap(minutesAsleep));
}

function getMaxOfMap(map: Map<string | number, number>) {
  let maxKey: string | number = "";
  let maxValue: number = 0;
  for (let [k, v] of map) {
    if (v > maxValue) {
      maxValue = v;
      maxKey = k;
    }
  }
  return maxKey;
}

function updateIds(
  records: {
    id: string | undefined;
  }[]
) {
  let id: string | undefined = undefined;
  for (let ln of records) {
    if (ln.id) {
      id = ln.id;
    } else {
      ln.id = id;
    }
  }
}

function initializeTimeAsleep(
  records: {
    id?: string;
  }[]
) {
  let timeAsleep = new Map<string, number>();

  for (let ln of records) {
    if (ln.id) {
      timeAsleep.set(ln.id, 0);
    }
  }
  return timeAsleep;
}

function initializeMinutesAsleep() {
  let minutesAsleep = new Map<number, number>();
  let x: number = 0;
  while (x < 60) {
    minutesAsleep.set(x, 0);
    x++;
  }
  return minutesAsleep;
}

function setTimeAsleep(
  records: {
    date: Date;
    id: string | undefined;
    asleep: boolean;
    awake: boolean;
  }[],
  timeAsleep: Map<string, number>
) {
  let fellAsleep = new Date();
  for (let ln of records) {
    if (ln.asleep) {
      fellAsleep = ln.date;
    } else if (ln.awake) {
      let minutes = (ln.date.getTime() - fellAsleep.getTime()) / 60_000;
      if (ln.id) timeAsleep.set(ln.id, timeAsleep.get(ln.id)! + minutes);
    }
  }
}

function setMinutesAsleep(
  records: {
    date: Date;
    id: string | undefined;
    asleep: boolean;
    awake: boolean;
  }[],
  sleepiestGuard: string | number,
  minutesAsleep: Map<number, number>
) {
  let fellAsleep = new Date();
  for (let ln of records) {
    if (ln.id != sleepiestGuard) continue;
    if (ln.asleep) {
      fellAsleep = ln.date;
    } else if (ln.awake) {
      for (let i = fellAsleep.getMinutes(); i < ln.date.getMinutes(); i++) {
        minutesAsleep.set(i, minutesAsleep.get(i)! + 1);
      }
    }
  }
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
