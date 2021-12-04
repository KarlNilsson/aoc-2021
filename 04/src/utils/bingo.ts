const BRICK_ROW = 5;

export type BingoBrick = {
  id: number;
  rows: Array<Array<{ number: number; checked: boolean }>>;
  keys: {
    [key: string]: { x: number; y: number };
  };
};

type BingoNumbers = Array<number>;

export const ParseBingo = async (
  inputData: string,
): Promise<{ numberSeries: BingoNumbers; bingoBricks: Array<BingoBrick> }> => {
  const inputDataSplit = inputData.split('\n');
  const numberSeries = inputDataSplit[0]
    .split(',')
    .map((val) => Number.parseInt(val, 10));

  let [, ...bingoBrickInput] = inputDataSplit;
  bingoBrickInput = bingoBrickInput.filter((val) => Boolean(val));

  const bingoBricks: Array<BingoBrick> = [];

  let i = 0;
  while (i < bingoBrickInput.length) {
    const bingoBrick: BingoBrick = {
      id: i / BRICK_ROW,
      rows: [],
      keys: {},
    };
    for (let j = 0; j < BRICK_ROW; j += 1) {
      const numberRow = bingoBrickInput[i + j]
        .split(' ')
        .filter((val) => Boolean(val))
        .map((val) => Number.parseInt(val, 10));
      bingoBrick.rows[j] = numberRow.map((number) => ({
        number,
        checked: false,
      }));
      numberRow.forEach((number, idx) => {
        bingoBrick.keys[number] = { x: j, y: idx };
      });
    }
    bingoBricks.push(bingoBrick);
    i += BRICK_ROW;
  }

  return { numberSeries, bingoBricks };
};

const markCell = (number: number, bingoBricks: Array<BingoBrick>) => {
  bingoBricks.forEach((bingoBrick) => {
    if (bingoBrick.keys[number]) {
      const { x, y } = bingoBrick.keys[number];
      // eslint-disable-next-line no-param-reassign
      bingoBrick.rows[x][y].checked = true;
    }
  });
};

const checkBrick = (bingoBrick: BingoBrick): boolean => {
  for (let i = 0; i < BRICK_ROW; i += 1) {
    if (bingoBrick.rows[i].every((cell) => cell.checked)) {
      return true;
    }
  }
  for (let j = 0; j < BRICK_ROW; j += 1) {
    const col = bingoBrick.rows.map((row) => row[j]);
    if (col.every((cell) => cell.checked)) {
      return true;
    }
  }

  return false;
};

export const FindLosingBrick = (
  numberSeries: BingoNumbers,
  bingoBricks: Array<BingoBrick>,
): { losingBrick: BingoBrick, lastNumber: number } => {
  let i = 0;

  const remainingBricks: Array<BingoBrick> = [...bingoBricks];
  let currentNumber = -1;
  let lastWinner: BingoBrick = bingoBricks[0];
  while (remainingBricks.length > 0) {
    currentNumber = numberSeries[i];
    markCell(currentNumber, remainingBricks);

    const bricksToRemove: Array<number> = [];
    for (let brickIdx = 0; brickIdx < remainingBricks.length; brickIdx += 1) {
      const brick = remainingBricks[brickIdx];
      if (checkBrick(brick)) {
        bricksToRemove.push(brick.id);
        lastWinner = brick;
      }
    }
    bricksToRemove.forEach((brickId) => {
      const index = remainingBricks.findIndex((remainingBrick) => remainingBrick.id === brickId);
      remainingBricks.splice(index, 1);
    });
    i += 1;
  }

  return { losingBrick: lastWinner, lastNumber: currentNumber };
};

export const FindWinningBrick = (
  numberSeries: BingoNumbers,
  bingoBricks: Array<BingoBrick>,
): { winningBrick: BingoBrick, lastNumber: number } => {
  let winningBrick: BingoBrick = bingoBricks[0];
  let winner = false;
  let i = 0;
  let currentNumber = -1;
  while (!winner && i < numberSeries.length) {
    currentNumber = numberSeries[i];
    markCell(currentNumber, bingoBricks);

    for (let brickIdx = 0; brickIdx < bingoBricks.length; brickIdx += 1) {
      const currentBrick = bingoBricks[brickIdx];
      if (checkBrick(currentBrick)) {
        winner = true;
        winningBrick = currentBrick;
        break;
      }
    }
    i += 1;
  }

  return { winningBrick, lastNumber: currentNumber };
};
