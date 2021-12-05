import read from '../io/file';
import { GenerateGrid } from '../utils/grid';
import { ParseSegments } from '../utils/parser';

const Task = async () => {
  const data = await read('input2.txt');
  const lines = ParseSegments(data);
  const grid = GenerateGrid(lines, false);

  const doubleCrosses = grid.array.filter((val) => val > 1);
  return doubleCrosses.length;
};

export default Task;
