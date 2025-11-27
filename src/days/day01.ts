import type { DayModule } from "./types";

const solver: DayModule["solver"] = {
  async part1(_input: string) {
    return "Not implemented";
  },
  async part2(_input: string) {
    return "Not implemented";
  },
};

const day01: DayModule = {
  id: 1,
  title: "Calorie Counting",
  solver,
};

export default day01;
