import read from '../io/file';

const Task = async () => {
  const binaryNumbers = await read('input2.txt');
  const binaryNumberList = binaryNumbers.split('\n');

  // Assume all input has the same length
  const inputLength = binaryNumberList[0].length;

  const gammaArray = Array(inputLength).fill(0);

  binaryNumberList.map((binary) => {
    gammaArray.map((_, idx) => {
      if (binary.charAt(idx) === '1') {
        gammaArray[idx] += 1;
      } else if (binary.charAt(idx) === '0') {
        gammaArray[idx] -= 1;
      }
    });
  });

  const gammaBinary = gammaArray.map((gamma) => (gamma > 0 ? 1 : 0));
  // Epsilon is the inverse of the gamma
  const epsilonBinary = gammaBinary.map((gamma) => (gamma === 1 ? 0 : 1));

  const gammaNumber = Number.parseInt(gammaBinary.join(''), 2);
  const epsilonNumber = Number.parseInt(epsilonBinary.join(''), 2);

  return gammaNumber * epsilonNumber;
};

export default Task;
