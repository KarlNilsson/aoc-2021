import read from '../io/file';

const Task = async () => {
  const data = await read('input2.txt');

  const positions = data.split(',').map((val: string) => Number.parseInt(val, 10));
  const maxDistance = positions.reduce((prev, val) => val > prev ? val : prev);
  const minFuelConsumption = {
    position: 0,
    fuelConsumption: 999999,
  };
  
  for (let targetPosition = 0; targetPosition <= maxDistance; targetPosition += 1) {
    let totalFuelConsumption = 0;
    positions.map((position) => {
      totalFuelConsumption += Math.abs(position - targetPosition);
    });
    if (totalFuelConsumption < minFuelConsumption.fuelConsumption) {
      minFuelConsumption.fuelConsumption = totalFuelConsumption;
    }
  }
  
  return minFuelConsumption.fuelConsumption;
};

export default Task;
