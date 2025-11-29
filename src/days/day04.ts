import type { DayModule } from "./types.js";

// Takes string of numbers separated by space
// 1 2 3 4 5 => [1,2,3,4,5]
function toNumbers(x: string): number[] {
    return x.trim().split(/\s+/).map(x => parseInt(x, 10));
}

const solver: DayModule["solver"] = {
  async part1(_input: string) {
    let output = 0;
    for (const cardLine of _input.trim().split("\n")) {
      const [winningNumbers, cardNumbers] = cardLine
        .substring(cardLine.indexOf(":") + 1)
        .split("|")
        .map(toNumbers)

      if (winningNumbers === undefined || cardNumbers === undefined) {
        throw new Error("bad card");
      }

      const winningSet = new Set(winningNumbers);
      const myWinningNumbers = cardNumbers.filter(nr => winningSet.has(nr));
      if (myWinningNumbers.length > 0) {
        output += Math.pow(2, myWinningNumbers.length - 1);
      }
    }

    return output
  },

  async part2(_input: string) {
    type OwnedCards = {
      quantity: number,
      matchingNumbers: number
    };

    const cards:OwnedCards[] = [];
    for (const cardLine of _input.trim().split("\n")) {
      const [winningNumbers, cardNumbers] = cardLine
        .substring(cardLine.indexOf(":") + 1)
        .split("|")
        .map(toNumbers)

      if (winningNumbers === undefined || cardNumbers === undefined) {
        throw new Error("bad card");
      }

      const winningSet = new Set(winningNumbers);
      cards.push({
        quantity: 1,
        matchingNumbers: cardNumbers.filter(nr => winningSet.has(nr)).length
      });
    }

    for (const [cardId, card] of cards.entries()) {
      for (let next = 1; next <= card.matchingNumbers; next++) {
        const nextId = cardId + next;
        if (cards[nextId] !== undefined) {
          cards[nextId].quantity += card.quantity;
        }
      }
    }

    return cards.reduce((sum, card) => sum + card.quantity, 0);
  },
};

const day04: DayModule = {
  id: 4,
  title: "Scratchcards",
  solver,
};

export default day04;
