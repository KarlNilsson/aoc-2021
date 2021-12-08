import assert from 'assert';

type SegmentNumber = string;

type Segment = Array<SegmentNumber>;

type Riddle = {
  segmentDisplay: Array<string>;
  segmentKeys: Segment;
  sequence: Segment;
};

type RiddleSolution = {
  letterMap: {
    [key: string]: number;
  };
  [key: number]: SegmentNumber;
  unknownSequences: Segment;
  segmentDisplay: Array<string>;
};

const parseSegments = (input: string): Array<Riddle> => {
  const riddles: Array<Riddle> = input.split('\n').map((row): Riddle => {
    const rowSplit = row.split('|');
    const rightSide = rowSplit[1]
      .split(' ')
      .filter((val) => Boolean(val))
      .map((segment) =>
        [...segment].sort((a, b) => a.localeCompare(b)).join('')
      );
    const leftSide = rowSplit[0]
      .split(' ')
      .filter((val) => Boolean(val))
      .map((segment) =>
        [...segment].sort((a, b) => a.localeCompare(b)).join('')
      );
    return {
      segmentDisplay: Array(7).fill('-'),
      segmentKeys: leftSide,
      sequence: rightSide,
    };
  });
  return riddles;
};

export const calculateEasyNumberOccurences = (input: string) => {
  const sequences = parseSegments(input).map((riddle) => riddle.sequence);
  return sequences.reduce((accTotal: number, segments) => {
    return (
      accTotal +
      segments.reduce((accLocal: number, segment) => {
        if ([2, 3, 4, 7].includes(segment.length)) {
          return accLocal + 1;
        }
        return accLocal;
      }, 0)
    );
  }, 0);
};

const removeKnownSequences = (solution: RiddleSolution): RiddleSolution => {
  const { unknownSequences: segmentKeys } = solution;
  const filteredSegmentKeys = segmentKeys;
  const [one] = filteredSegmentKeys.splice(
    (() => filteredSegmentKeys.findIndex((segment) => segment.length === 2))(),
    1
  );
  const [four] = filteredSegmentKeys.splice(
    (() => filteredSegmentKeys.findIndex((segment) => segment.length === 4))(),
    1
  );
  const [seven] = filteredSegmentKeys.splice(
    (() => filteredSegmentKeys.findIndex((segment) => segment.length === 3))(),
    1
  );
  const [eight] = filteredSegmentKeys.splice(
    (() => filteredSegmentKeys.findIndex((segment) => segment.length === 7))(),
    1
  );
  return {
    ...solution,
    letterMap: {
      [one]: 1,
      [four]: 4,
      [seven]: 7,
      [eight]: 8,
    },
    1: one,
    4: four,
    7: seven,
    8: eight,
    unknownSequences: filteredSegmentKeys,
  };
};

const findNine = (solution: RiddleSolution): RiddleSolution => {
  const filteredSegmentKeys = solution.unknownSequences;
  const { 4: four, 8: eight } = solution;
  assert(four, '4 not found!');
  assert(eight, '8 not found!');

  const sixLetters = filteredSegmentKeys.filter(
    (sequence) => sequence.length === 6
  );

  const remaining = [...eight].filter(
    (segmentDisplay) => ![...four].includes(segmentDisplay)
  );
  const [nineSequence] = sixLetters.filter(
    (segment) =>
      [...segment].reduce(
        (acc, letter) => (remaining.includes(letter) ? acc + 1 : acc),
        0
      ) === 2
  );

  console.table(filteredSegmentKeys);
  const [nine] = filteredSegmentKeys.splice(
    (() => filteredSegmentKeys.findIndex((val) => val === nineSequence))(),
    1
  );

  const [segmentFour] = [...eight].filter(
    (letter) => ![...nine].includes(letter)
  );

  return {
    ...solution,
    letterMap: {
      ...solution.letterMap,
      [nine]: 9,
    },
    9: nine,
    unknownSequences: filteredSegmentKeys,
    segmentDisplay: {
      ...solution.segmentDisplay,
      4: segmentFour,
    },
  };
};

const findSixAndZero = (solution: RiddleSolution): RiddleSolution => {
  const filteredSegmentKeys = solution.unknownSequences;
  const { 1: one, 8: eight } = solution;
  assert(one, '1 not found!');
  assert(eight, '8 not found!');

  const sixLetters = filteredSegmentKeys.filter(
    (sequence) => sequence.length === 6 && sequence !== solution[9]
  );

  const [zero] = sixLetters.filter((segment) =>
    [...one].every((letter) => segment.includes(letter))
  );
  const [segmentThree] = [...eight].filter((letter) => !zero.includes(letter));
  const [six] = sixLetters.splice(
    (() => sixLetters.findIndex((segment) => segment !== zero))(),
    1
  );
  const [segmentTwo] = [...eight].filter((letter) => !six.includes(letter));

  return {
    ...solution,
    letterMap: {
      ...solution.letterMap,
      [zero]: 0,
      [six]: 6,
    },
    0: zero,
    6: six,
    segmentDisplay: {
      ...solution.segmentDisplay,
      2: segmentTwo,
      3: segmentThree,
    },
    unknownSequences: filteredSegmentKeys.filter(
      (sequence) => sequence.length !== 6
    ),
  };
};

const findTwoFiveAndThree = (solution: RiddleSolution): RiddleSolution => {
  const { 2: segment2, 3: segment3, 4: segment4 } = solution.segmentDisplay;
  const filteredSegmentKeys = solution.unknownSequences;
  assert(segment2, 'Segment 2 not found!');
  assert(segment3, 'Segment 3 not found!');
  assert(segment4, 'Segment 4 not found!');

  const three = filteredSegmentKeys.find(
    (segment) => !segment.includes(segment4) && segment.includes(segment2)
  );
  const two = filteredSegmentKeys.find(
    (segment) => segment.includes(segment4) && segment.includes(segment2)
  );
  const five = filteredSegmentKeys.find(
    (segment) => !segment.includes(segment4) && !segment.includes(segment2)
  );

  assert(two, '2 not found!');
  assert(three, '3 not found!');
  assert(five, '5 not found!');

  return {
    ...solution,
    letterMap: {
      ...solution.letterMap,
      [two]: 2,
      [three]: 3,
      [five]: 5,
    },
    2: two,
    3: three,
    5: five,
    unknownSequences: filteredSegmentKeys.filter(
      (sequence) => sequence !== two && sequence !== three && sequence !== five
    ),
  };
};

const solveRiddle = (riddle: Riddle): string => {
  let solution: RiddleSolution = {
    letterMap: {},
    unknownSequences: riddle.segmentKeys,
    segmentDisplay: Array(7).fill('-'),
  };
  solution = removeKnownSequences(solution);
  solution = findNine(solution);
  solution = findSixAndZero(solution);
  solution = findTwoFiveAndThree(solution);

  return riddle.sequence
    .map((segment) => {
      return solution.letterMap[segment];
    })
    .join('');
};

export const solveRiddles = (input: string): Array<number> => {
  const riddles = parseSegments(input);

  const outputs = riddles
    .map((riddle) => solveRiddle(riddle))
    .map((output) => Number.parseInt(output, 10));

  return outputs;
};
