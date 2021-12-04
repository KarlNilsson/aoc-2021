import read from '../io/file';
import { FindLosingBrick, ParseBingo } from '../utils/bingo';
import { sumOfUnchecked } from '../utils/calc';

const Task = async () => {
  const data = await read('input2.txt');
  const { numberSeries, bingoBricks } = await ParseBingo(data);
  const { losingBrick, lastNumber } = FindLosingBrick(
    numberSeries,
    bingoBricks,
  );

  const sum = sumOfUnchecked(losingBrick);
  return sum * lastNumber;
};

export default Task;
