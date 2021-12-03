import read from '../io/file';

const separateFromBits = (list: Array<string>, index: number) => {
  const setList: Array<string> = [];
  const unsetList: Array<string> = [];

  list.map((dataPoint) => {
    if (dataPoint.charAt(index) === '1') {
      setList.push(dataPoint);
    } else if (dataPoint.charAt(index) === '0') {
      unsetList.push(dataPoint);
    }
  });

  return { setList, unsetList };
};

const Task = async () => {
  const binaryNumbers = await read('input2.txt');
  const binaryNumberList = binaryNumbers.split('\n');

  // Assume all input has the same length
  const inputLength = binaryNumberList[0].length;

  let oxygenList = binaryNumberList;
  let co2List = binaryNumberList;

  let iterationIndex = 0;
  while (oxygenList.length > 1) {
    const { setList, unsetList } = separateFromBits(oxygenList, iterationIndex);

    oxygenList = setList.length < unsetList.length ? unsetList : setList;
    iterationIndex += 1 % inputLength;
  }

  iterationIndex = 0;
  while (co2List.length > 1) {
    const { setList, unsetList } = separateFromBits(co2List, iterationIndex);

    co2List = setList.length < unsetList.length ? setList : unsetList;
    iterationIndex += 1 % inputLength;
  }

  const oxygenNumber = Number.parseInt(oxygenList[0], 2);
  const co2Number = Number.parseInt(co2List[0], 2);

  return oxygenNumber * co2Number;
};

export default Task;
