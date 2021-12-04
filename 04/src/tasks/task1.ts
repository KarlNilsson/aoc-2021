import read from '../io/file';
import { FindWinningBrick, ParseBingo } from '../utils/bingo';
import { sumOfUnchecked } from '../utils/calc';

const Task = async () => {
  const data = await read('input2.txt');
  const { numberSeries, bingoBricks } = await ParseBingo(data);
  const { winningBrick, lastNumber } = FindWinningBrick(
    numberSeries,
    bingoBricks,
  );
  const sum = sumOfUnchecked(winningBrick);

  return sum * lastNumber;
};

export default Task;
