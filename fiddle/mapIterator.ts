const m = new Map();
m.set(1, 2);
m.set(3, 4);

console.log({ m });

console.log(m.entries());
const x = Array.from(m.entries().filter((x) => x[1] === 2));
console.log({ x });
const y = x.map((x) => x[1]);
console.log({ y });
