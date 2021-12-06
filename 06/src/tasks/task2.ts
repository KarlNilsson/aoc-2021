import read from '../io/file';
import { simulateFishGrowth } from '../utils/Fish';

const Task = async () => {
  const data = await read('input2.txt');
  return simulateFishGrowth(data, 256);
};

export default Task;
