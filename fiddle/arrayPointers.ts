if (true) {
  const a = [1, 2, 3];
  const b = a;
  const c = [...a];

  console.log({ a, b, c });

  a.push(4);
  console.log({ a, b, c });
}

console.log();

if (true) {
  const a = [[1, 2], new Map([[3, 4]])];
  const b = a;
  const c = [...a]; //shallow
  const d = structuredClone(a); //deep (whole structure)

  console.log({ a, b, c, d });

  a.push([5, 6]);
  a[0].push(9);
  a[1].set(9, 8);
  console.log({ a, b, c, d });
}
