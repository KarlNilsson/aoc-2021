import { readFile } from 'fs/promises';

const read = async (fileName: string) => {
  return readFile(`./input/${fileName}`, { encoding: 'utf-8' });
};

export default read;
