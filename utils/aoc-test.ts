import chalk from "chalk";

export function aocTest(
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
