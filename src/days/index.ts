import day01 from "./day01";
import type { DayModule } from "./types";
import { formatDayId } from "../lib/day";

const registry = new Map<number, DayModule>();

function registerDay(module: DayModule): void {
  if (registry.has(module.id)) {
    throw new Error(`Day ${formatDayId(module.id)} is registered more than once.`);
  }

  registry.set(module.id, module);
}

registerDay(day01);

export { formatDayId };

export function listAvailableDays(): number[] {
  return Array.from(registry.keys()).sort((a, b) => a - b);
}

export function getDay(day: number): DayModule | undefined {
  return registry.get(day);
}
