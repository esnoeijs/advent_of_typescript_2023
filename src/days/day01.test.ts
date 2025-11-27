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
    it("should solve example input", async () => {
      // Add your example input and expected output here
      const exampleInput = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;
      const expected = 281;
      const result = await day01.solver.part2(exampleInput);
      expect(result).toBe(expected);
    });
  });
});
