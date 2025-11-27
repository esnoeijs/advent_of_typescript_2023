# aoc-typescript-2023-cli

A minimal, modern TypeScript setup tailored for solving Advent of Code puzzles with a Node.js CLI.

## Getting Started

```bash
pnpm install
pnpm dev -- --list
```

Build the distributable bundle and run the CLI from `dist/` once you're ready to execute a specific day.

```bash
pnpm build
pnpm start -- --day 1 --part 1
```

To explore the currently scaffolded days:

```bash
pnpm start -- --list
```

## Project Structure

- `src/days/dayXX.ts` — one file per puzzle day that exports a default `DayModule`.
- `src/days/index.ts` — central registry that maps day numbers to solvers.
- `inputs/dayXX.txt` — default location for each day's puzzle input (add variants like `day01.sample.txt`).
- `src/lib/input.ts` — helpers for resolving and loading input files.
- `src/cli.ts` — the command-line entry point that dispatches to the chosen solver.

## Implementing a New Day

1. Copy `src/days/day01.ts` to `src/days/dayXX.ts` (replace `XX` with the day number).
2. Import the new module in `src/days/index.ts` and add it with `registerDay`.
3. Update the exported `DayModule` with your real puzzle logic.
4. Drop your input into `inputs/dayXX.txt` (or point the CLI to a custom path with `--input`).
5. Run the solver:

```bash
pnpm start -- --day XX --part 1
```

By default, running without `--part` executes both parts sequentially and prints the results.

## CLI Options

```text
-h, --help            Show usage information
    --list            List the available days discovered at runtime
    --day <n>         Select the day to run (defaults to the latest available)
    --part <1|2>      Run only part 1 or part 2 (defaults to both)
    --variant <name>  Choose an input variant, e.g. "sample" (defaults to "puzzle")
    --input <path>    Override the input file location
```
