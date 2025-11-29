import type { DayModule } from "./types.js";

type Part = {
  id: string;
  locations: Set<string>;
}
type Gear = {
  location: string;
  adjacent: Set<string>;
}

function getAdjacentParts(gear: Gear, parts: Part[]): Part[] {
    return parts.filter(part => Array.from(part.locations).some(loc => gear.adjacent.has(loc)));
}

const solver: DayModule["solver"] = {
  async part1(_input: string) {
    const rowLength = _input.search("\n") + 1;
    if (rowLength === -1) {
      throw new Error("Invalid input, no grid");
    }

    let part: Part = {id: "", locations: new Set()};
    const parts: Part[] = [];
    const symbolLocations = new Set<string>();
    for (let idx = 0; idx < _input.length; idx++) {
      const rowIdx = Math.floor(idx / rowLength);
      const colIdx = idx % rowLength;
      const char = _input.charAt(idx);

      if (char >= "0" && char <= "9") {
        part.id += char;
        part.locations.add(`${colIdx},${rowIdx}`);
      } else {
        if (part.id.length > 0) {
          parts.push(part);
          part = {id: "", locations: new Set()};
        }

        if (char !== "." && char !== "\n") {
          symbolLocations.add(`${colIdx - 1},${rowIdx - 1}`);
          symbolLocations.add(`${colIdx},${rowIdx - 1}`);
          symbolLocations.add(`${colIdx + 1},${rowIdx - 1}`);

          symbolLocations.add(`${colIdx - 1},${rowIdx}`);
          symbolLocations.add(`${colIdx},${rowIdx}`);
          symbolLocations.add(`${colIdx + 1},${rowIdx}`);

          symbolLocations.add(`${colIdx - 1},${rowIdx + 1}`);
          symbolLocations.add(`${colIdx},${rowIdx + 1}`);
          symbolLocations.add(`${colIdx + 1},${rowIdx + 1}`);
        }
      }
    }

    return parts
      .filter(part => Array.from(part.locations).some(loc => symbolLocations.has(loc)))
      .reduce((sum, part) => sum + parseInt(part.id, 10), 0);
  },

  async part2(_input: string) {
     const rowLength = _input.search("\n") + 1;
    if (rowLength === -1) {
      throw new Error("Invalid input, no grid");
    }

    let part: Part = {id: "", locations: new Set()};
    const parts: Part[] = [];
    const gears: Gear[] = [];
    for (let idx = 0; idx < _input.length; idx++) {
      const rowIdx = Math.floor(idx / rowLength);
      const colIdx = idx % rowLength;
      const char = _input.charAt(idx);

      if (char >= "0" && char <= "9") {
        part.id += char;
        part.locations.add(`${colIdx},${rowIdx}`);
      } else {
        if (part.id.length > 0) {
          parts.push(part);
          part = {id: "", locations: new Set()};
        }

        if (char == "*")  {
          gears.push({
            location: `${colIdx},${rowIdx}`,
            adjacent: new Set([
              `${colIdx - 1},${rowIdx - 1}`,
              `${colIdx},${rowIdx - 1}`,
              `${colIdx + 1},${rowIdx - 1}`,

              `${colIdx - 1},${rowIdx}`,
              `${colIdx + 1},${rowIdx}`,

              `${colIdx - 1},${rowIdx + 1}`,
              `${colIdx},${rowIdx + 1}`,
              `${colIdx + 1},${rowIdx + 1}`,
            ])
          });
        }
      }
    }

    return gears
          .map(gear => getAdjacentParts(gear, parts))
          .filter(parts => parts.length === 2)
          .map(parts => parts.reduce((product, part) => product * parseInt(part.id, 10), 1))
          .reduce((sum, partProduct) => sum + partProduct, 0)

  },
};

const day03: DayModule = {
  id: 3,
  title: "Gear Ratios",
  solver,
};

export default day03;
