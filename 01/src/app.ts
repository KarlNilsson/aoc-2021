import Task1 from './tasks/task1';
import Task2 from './tasks/task2';

const main = async () => {
  const t1Result = await Task1();
  const t2Result = await Task2();

  console.log(`Task 1: ${t1Result}`);
  console.log(`Task 2: ${t2Result}`);
};

main();
