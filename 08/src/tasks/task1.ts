import read from '../io/file';
import { calculateEasyNumberOccurences } from '../utils/numbers';

const Task = async () => {
  const data = await read('input2.txt');
  return calculateEasyNumberOccurences(data);
};

export default Task;
