import { BingoBrick } from './bingo';

export const sumOfUnchecked = (brick: BingoBrick): number => {
  let brickFlat: Array<{ number: number; checked: boolean }> = [];
  brick.rows.forEach((row) => {
    brickFlat = brickFlat.concat(row);
  });

  const uncheckedSum = brickFlat
    .filter((val) => !val.checked)
    .reduce((acc, val) => {
      return acc + val.number;
    }, 0);

  return uncheckedSum;
};
