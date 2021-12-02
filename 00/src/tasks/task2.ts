import read from '../io/file';

const Task = async () => {
  const data = await read('input2.txt');
  console.log(data);
};

export default Task;
