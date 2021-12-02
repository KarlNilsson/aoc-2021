import read from '../io/file';

const Task = async () => {
  const depthList = await read('input1.txt');
  let depthIncrease = 0;

  const splitData = depthList.split('\n').map((depth) => Number.parseInt(depth, 10));
  let prevData = splitData[0];
  for (let i = 1; i < splitData.length; i += 1) {
    const currentData = splitData[i];
    if (currentData > prevData) {
      depthIncrease += 1;
    }
    prevData = currentData;
  }
  return depthIncrease;
};

export default Task;
