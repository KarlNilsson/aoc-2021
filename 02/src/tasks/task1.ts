import read from '../io/file';

const Task = async () => {
  const movementData = await read('input1.txt');

  const movementSplit = movementData.split('\n');
  const position = [0, 0];

  movementSplit.map(async (movement) => {
    const direction = movement.split(' ')[0];
    const distance = Number.parseInt(movement.split(' ')[1], 10);

    switch (direction) {
      case 'forward':
        position[0] += distance;
        break;
      case 'down':
        position[1] += distance;
        break;
      case 'up':
        position[1] -= distance;
        break;
      default:
        break;
    }
  });

  return position[0] * position[1];
};

export default Task;
