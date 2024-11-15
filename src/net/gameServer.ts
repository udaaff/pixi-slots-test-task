import { cfg } from "../game/cfg";
import { getRandomUint } from "../utils/random";

export type SlotResult = {
  reels: number[][];
  win: boolean;
};

function getRandomSymbol(): number {
  return getRandomUint(cfg.numSymbols);
}

function getRandomSlotResult(): SlotResult {
  const reels = Math.random() < 0.5
  ? [
      [getRandomSymbol(), getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
      [getRandomSymbol(), getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
      [getRandomSymbol(), getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
    ]
  : [
      [0, 1, 3, 3],
      [1, 1, 3, 2],
      [2, 1, 2, 0],
    ];

  const win = reels[0][1] === reels[1][1] && reels[1][1] === reels[2][1];

  return { reels, win };
}

export async function mockServerRequest(): Promise<SlotResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = getRandomSlotResult();
      resolve(result);
    }, 50);
  });
}
