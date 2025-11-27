import { describe, it, expect } from "vitest";
import day01 from "./day01";

describe("Day 01", () => {
  describe("Part 1", () => {
    it("should solve example input", async () => {
      // Add your example input and expected output here
      const exampleInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;
      const expected = 142;
      const result = await day01.solver.part1(exampleInput);
      expect(result).toBe(expected);
    });
  });

  describe("Part 2", () => {
    it("should return a result", async () => {
      const input = "sample input";
      const result = await day01.solver.part2(input);
      expect(result).toBeDefined();
    });

    it.skip("should solve example input", async () => {
      // Add your example input and expected output here
      const exampleInput = ``;
      const expected = 0;
      const result = await day01.solver.part2(exampleInput);
      expect(result).toBe(expected);
    });
  });
});
