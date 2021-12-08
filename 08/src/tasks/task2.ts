import read from '../io/file';
import { solveRiddles } from '../utils/numbers';

const Task = async () => {
  const data = await read('input2.txt');
  const output = solveRiddles(data);
  return output.reduce((acc, num) => (acc += num), 0);
};

export default Task;
