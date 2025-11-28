import type { DayModule } from "./types";

class GameInvalid extends Error {}

type Color = 'red' | 'blue' | 'green';
type CubeSet = Record<Color, number>;

const solver: DayModule["solver"] = {
  async part1(_input: string) {
    // each line is a game and we start with an index `game {index}`
    // each game multiple sets of cubes separated by `;`
    const cubeLimit: CubeSet = {
      "red": 12,
      "green": 13,
      "blue": 14
    }
    let output = 0;
    const games = _input.trim().split("\n");
    for (const gameLine of games) {
      const [game, sets] = gameLine.split(':');
      let gameValid = true;
      if (game === undefined || sets === undefined) {
        throw new GameInvalid("invalid game string");
      }
      // `game 123` get number by 5 and onward
      const gameId = parseInt(game.substring(5));

      for (const set of sets.split(";")) {
        const cubes = set.split(",");
        for (const cube of cubes) {
          const [cubeCount, cubeColor] = cube.trim().split(" ") as [string | undefined, Color | undefined];
          if (cubeCount === undefined || cubeColor === undefined) {
            throw new GameInvalid("invalid game cube string");
          }
          if (!(cubeColor in cubeLimit)) {
            throw new GameInvalid(`invalid game string: unknown color: "${cubeColor}"`);
          }
          if (parseInt(cubeCount) > cubeLimit[cubeColor]) {
            gameValid = false;
            break;
          }
        }
      }
      output += gameValid ? gameId : 0;
    }
    return output;
  },

  async part2(_input: string) {
    let output = 0;
    const games = _input.trim().split("\n");
    for (const gameLine of games) {
      let cubeLimit = {
        "red": 0,
        "green": 0,
        "blue": 0
      }
      const [game, sets] = gameLine.split(':');
      if (game === undefined || sets === undefined) {
        throw new GameInvalid("invalid game string");
      }

      for (const set of sets.split(";")) {
        const cubes = set.split(",");
        for (const cube of cubes) {
          const [cubeCount, cubeColor] = cube.trim().split(" ") as [string | undefined, Color | undefined];
          if (cubeCount === undefined || cubeColor === undefined) {
            throw new GameInvalid("invalid game cube string");
          }
          if (!(cubeColor in cubeLimit)) {
            throw new GameInvalid(`invalid game string: unknown color: "${cubeColor}"`);
          }
          cubeLimit[cubeColor] = Math.max(parseInt(cubeCount), cubeLimit[cubeColor]);
        }
      }

      output += cubeLimit.red * cubeLimit.blue * cubeLimit.green
    }
    return output;
  },
};

const day02: DayModule = {
  id: 2,
  title: "Cube Conundrum",
  solver,
};

export default day02;
