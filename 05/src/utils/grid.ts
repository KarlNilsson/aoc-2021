interface Point {
  x: number;
  y: number;
}

export interface Line {
  p1: Point;
  p2: Point;
}

type Grid = {
  array: Array<number>;
  width: number;
  height: number;
};

type GridDisplay = Array<string>;

const CoordsToGridIndex = (point: Point, width: number) => {
  return point.y * width + point.x;
};

const StraightLine = (line: Line) => {
  return line.p1.x === line.p2.x || line.p1.y === line.p2.y;
};

export const PrintGrid = (grid: Grid) => {
  const dottedGrid = grid.array.map((gridPoint) =>
    gridPoint === 0 ? "." : gridPoint
  );
  const grid2D: GridDisplay = [];
  while (dottedGrid.length > 0) {
    const gridSplice = dottedGrid.splice(0, grid.width);
    if (gridSplice) {
      grid2D.push(gridSplice.join(""));
    }
  }
  console.log(grid2D.join("\n"));
};

const InsertPoint = (grid: Grid, point: Point) => {
  const gridIndex = CoordsToGridIndex(point, grid.width);
  grid.array[gridIndex] += 1;
};

const InsertLine = (grid: Grid, line: Line) => {
  const horizontal = line.p1.y === line.p2.y;
  const diagonal =
    Math.abs(line.p2.x - line.p1.x) === Math.abs(line.p2.y - line.p1.y);

  if (diagonal) {
    const directionX = line.p2.x > line.p1.x ? 1 : -1;
    const directionY = line.p2.y > line.p1.y ? 1 : -1;
    const length = Math.abs(line.p2.x - line.p1.x) + 1;
    let x = line.p1.x, y = line.p1.y;
    for (let i = 0; i < length; i += 1) {
      InsertPoint(grid, { x, y });
      x += directionX;
      y += directionY;
    }
  }
  else if (horizontal) {
    const startPoint = line.p1.x > line.p2.x ? line.p2 : line.p1;
    const length = Math.abs(line.p2.x - line.p1.x) + 1;
    for (let i = 0; i < length; i += 1) {
      InsertPoint(grid, { x: startPoint.x + i, y: startPoint.y });
    }
  } else {
    const startPoint = line.p1.y > line.p2.y ? line.p2 : line.p1;
    const length = Math.abs(line.p2.y - line.p1.y) + 1;
    for (let i = 0; i < length; i += 1) {
      InsertPoint(grid, { x: startPoint.x, y: startPoint.y + i });
    }
  }
};

export const GenerateGrid = (inputLines: Line[], noDiagonal = true): Grid => {
  const lines = noDiagonal ? inputLines.filter(StraightLine) : inputLines
  const maxDimensions = lines.reduce(
    (previousMax: { x: number; y: number }, line: Line) => {
      const currentMaxX = Math.max(previousMax.x, line.p1.x, line.p2.x);
      const currentMaxY = Math.max(previousMax.y, line.p1.y, line.p2.y);
      return { x: currentMaxX, y: currentMaxY };
    },
    { x: 0, y: 0 }
  );

  const width = maxDimensions.x + 1;
  const height = maxDimensions.y + 1;
  const grid: Grid = {
    array: Array(width * height).fill(0),
    width,
    height,
  };
  lines.map((line) => {
    InsertLine(grid, line);
  });

  return grid;
};
