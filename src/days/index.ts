import type { DayModule } from "./types";
import { formatDayId } from "../lib/utils";

// Import all day modules here
// When adding a new day, simply add: import dayXX from "./dayXX";
import day01 from "./day01";
import day02 from "./day02";
import day03 from "./day03";

const registry = new Map<number, DayModule>();

// Auto-register all imported day modules
const dayModules: DayModule[] = [
  day01,
  day02,
  day03,
  // Add new days here
];

for (const module of dayModules) {
  if (registry.has(module.id)) {
    throw new Error(`Day ${formatDayId(module.id)} is registered more than once.`);
  }

  registry.set(module.id, module);
}

export { formatDayId };

export function listAvailableDays(): number[] {
  return Array.from(registry.keys()).sort((a, b) => a - b);
}

export function getDay(day: number): DayModule | undefined {
  return registry.get(day);
}
