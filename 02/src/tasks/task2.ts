import read from '../io/file';

const Task = async () => {
  const movementData = await read('input1.txt');

  const movementSplit = movementData.split('\n');
  const position = [0, 0];
  let aim = 0;

  movementSplit.map(async (movement) => {
    const direction = movement.split(' ')[0];
    const value = Number.parseInt(movement.split(' ')[1], 10);

    if (direction === 'forward') {
      position[0] += value;
      position[1] += value * aim;
    } else if (direction === 'down') {
      aim += value;
    } else if (direction === 'up') {
      aim -= value;
    }
  });

  return position[0] * position[1];
};

export default Task;
