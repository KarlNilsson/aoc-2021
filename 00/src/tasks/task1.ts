import read from '../io/file';

const Task = async () => {
  const data = await read('input1.txt');
  console.log(data);
};

export default Task;
