import { readFile } from "node:fs/promises";
import process from "node:process";

import { formatDayId, getDay, listAvailableDays } from "./days";
import { loadInput } from "./lib/input";

const PARTS = new Set([1, 2] as const);

type PartNumber = 1 | 2;

type CliOptions = {
  help?: boolean;
  list?: boolean;
  day?: number;
  part?: PartNumber;
  variant?: string;
  inputPath?: string;
};

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg === "--list") {
      options.list = true;
      continue;
    }

    if (arg.startsWith("--day=")) {
      options.day = Number.parseInt(arg.slice("--day=".length), 10);
      continue;
    }

    if (arg === "--day" && i + 1 < argv.length) {
      options.day = Number.parseInt(argv[++i] ?? "", 10);
      continue;
    }

    if (arg.startsWith("--part=")) {
      options.part = parsePart(arg.slice("--part=".length));
      continue;
    }

    if (arg === "--part" && i + 1 < argv.length) {
      options.part = parsePart(argv[++i] ?? "");
      continue;
    }

    if (arg.startsWith("--variant=")) {
      options.variant = arg.slice("--variant=".length);
      continue;
    }

    if (arg === "--variant" && i + 1 < argv.length) {
      options.variant = argv[++i];
      continue;
    }

    if (arg.startsWith("--input=")) {
      options.inputPath = arg.slice("--input=".length);
      continue;
    }

    if (arg === "--input" && i + 1 < argv.length) {
      options.inputPath = argv[++i];
    }
  }

  return options;
}

function parsePart(raw: string): PartNumber | undefined {
  const value = Number.parseInt(raw, 10);

  return PARTS.has(value as PartNumber) ? (value as PartNumber) : undefined;
}

function printHelp(): void {
  console.log(`Usage: aoc-typescript-2023 [options]\n\n`
    + `Options:\n`
    + `  -h, --help            Show this message\n`
    + `      --list            List the available days\n`
    + `      --day <n>         Select the day to run (defaults to latest)\n`
    + `      --part <1|2>      Run only a single part (defaults to both)\n`
    + `      --variant <name>  Input variant, defaults to \"puzzle\"\n`
    + `      --input <path>    Override input file path`);
}

function printAvailableDays(days: number[]): void {
  if (days.length === 0) {
    console.log("No days available yet. Add files under src/days/dayXX.ts to get started.");
    return;
  }

  console.log(`Available days: ${days.map(formatDayId).join(", ")}`);
}

async function runCLI(): Promise<number> {
  const [, , ...argv] = process.argv;
  const options = parseArgs(argv);

  const availableDays = listAvailableDays();

  if (options.help) {
    printHelp();
    return 0;
  }

  if (options.list) {
    printAvailableDays(availableDays);
    return 0;
  }

  if (availableDays.length === 0) {
    console.error("No AoC days found. Add files under src/days/dayXX.ts to continue.");
    return 1;
  }

  const targetDay = options.day ?? availableDays[availableDays.length - 1];

  if (!Number.isInteger(targetDay) || targetDay < 1 || targetDay > 25) {
    console.error("Invalid day provided. Expected an integer between 1 and 25.");
    return 1;
  }

  const module = getDay(targetDay);

  if (!module) {
    console.error(`Day ${formatDayId(targetDay)} is not implemented yet.`);
    return 1;
  }

  const partsToRun = options.part ? [options.part] : [1, 2];
  const variant = options.variant ?? "puzzle";

  const input = options.inputPath
    ? await readFile(options.inputPath, "utf8")
    : await loadInput({ day: targetDay, variant, cwd: process.cwd(), fallback: "" });

  let exitCode = 0;

  for (const part of partsToRun) {
    const solver = part === 1 ? module.solver.part1 : module.solver.part2;

    try {
      const result = await solver(input);
      console.log(`Day ${formatDayId(targetDay)} Part ${part}: ${String(result)}`);
    } catch (error) {
      exitCode = 1;
      console.error(`Error running Day ${formatDayId(targetDay)} Part ${part}:`, error);
    }
  }

  return exitCode;
}

void runCLI().then((code) => {
  process.exitCode = code;
}).catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
