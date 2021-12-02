import read from '../io/file';

const Task = async () => {
  const depthList = await read('input2.txt');
  let depthIncrease = 0;

  const splitData = depthList.split('\n').map((depth) => Number.parseInt(depth, 10));

  let previousWindow = [splitData[0], splitData[1], splitData[2]];
  for (let i = 3; i < splitData.length; i += 1) {
    const currentWindow = [splitData[i], splitData[i - 1], splitData[i - 2]];
    const prevWindowDepth = previousWindow.reduce((a, b) => a + b);
    const currentWindowDepth = currentWindow.reduce((a, b) => a + b);
    if (currentWindowDepth > prevWindowDepth) {
      depthIncrease += 1;
    }
    previousWindow = currentWindow;
  }

  return depthIncrease;
};

export default Task;
