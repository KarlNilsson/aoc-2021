import { Line } from "./grid";

export const ParseSegments = (data: string): Line[] => {
  const dataSplit = data.split("\n");
  const lines = dataSplit
    .filter((data) => Boolean(data))
    .map((data) => {
      const points = data
        .replace(" -> ", ",")
        .split(",")
        .map((p) => Number.parseInt(p, 10));
      const line: Line = {
        p1: {
          x: points[0],
          y: points[1],
        },
        p2: {
          x: points[2],
          y: points[3],
        },
      };
      return line;
    });
  return lines;
};
