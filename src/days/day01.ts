import type { DayModule } from "./types.js";

function detectNumber(line: string, first: number): string | false {
  const numChar = line.charAt(first);
  if (numChar >= "0" && numChar <= "9") {
    return numChar;
  }

  const numbers = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
  ];

  for (const [idx, number] of numbers.entries()) {
    if (number === line.substring(first, first + number.length)) {
      return String(idx);
    }
  }

  return false;
}

const solver: DayModule["solver"] = {
  async part1(_input: string) {
    let sum = 0;
    for (const line of _input.split("\n")) {
      if (line.length === 0) continue;
      let first = 0;
      let last = line.length;
      while (first <= last) {
        const firstNum = line.charAt(first);
        const lastNum = line.charAt(last);

        if (firstNum < "0" || firstNum > "9") {
          first++;
          continue;
        }
        if (lastNum < "0" || lastNum > "9") {
          last--;
          continue;
        }

        sum += parseInt(`${firstNum}${lastNum}`);
        break;
      }
    }
    return sum;
  },

  async part2(_input: string) {
    let sum = 0;
    for (const line of _input.split("\n")) {
      if (line.length === 0) continue;
      let first = 0;
      let last = line.length;
      while (first <= last) {
        const firstNum = detectNumber(line, first);
        const lastNum = detectNumber(line, last);

        if (!firstNum) {
          first++;
          continue;
        }
        if (!lastNum) {
          last--;
          continue;
        }

        sum += parseInt(`${firstNum}${lastNum}`);
        break;
      }
    }

    return sum;
  },
};

const day01: DayModule = {
  id: 1,
  title: "Trebuchet?!",
  solver,
};

export default day01;
