import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { formatDayId } from "./day";

export interface LoadInputOptions {
  day: number;
  variant?: string;
  cwd?: string;
  fallback?: string;
}

export function resolveInputPath(options: LoadInputOptions): string {
  const { day, variant = "puzzle", cwd = process.cwd() } = options;
  const suffix = variant === "puzzle" ? "" : `.${variant}`;
  return resolve(cwd, "inputs", `day${formatDayId(day)}${suffix}.txt`);
}

export async function loadInput(options: LoadInputOptions): Promise<string> {
  const path = resolveInputPath(options);

  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return options.fallback ?? "";
    }

    throw error;
  }
}
