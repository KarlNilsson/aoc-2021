export const simulateFishGrowth = (
  data: string,
  days: number
): number => {
  const fish = Array(9).fill(0);
  data.split(',').map((val) => {
    const num = Number.parseInt(val, 10);
    fish[num] += 1;
  });

  for (let i = 0; i < days; i += 1) {
    const newFish = fish[0];
    for (let j = 0; j < fish.length - 1; j += 1) {
      fish[j] = fish[j + 1];
    }
    fish[fish.length - 3] += newFish;
    fish[fish.length - 1] = newFish;
  }

  const totalFish = fish.reduce((acc, num) => {
    return acc + num;
  }, 0);

  return totalFish;
};
