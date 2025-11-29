
import { describe, it, expect } from "vitest";
import day03 from "./day03";

describe("Day 03", () => {
  describe("Part 1", () => {
    it("should solve example input", async () => {
      // Add your example input and expected output here
      const exampleInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
      const expected = 4361;
      const result = await day03.solver.part1(exampleInput);
      expect(result).toBe(expected);
    });
  });

  describe("Part 2", () => {
    it("should solve example input", async () => {
      // Add your example input and expected output here
      const exampleInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
      const expected = 467835;
      const result = await day03.solver.part2(exampleInput);
      expect(result).toBe(expected);
    });
  });
});
