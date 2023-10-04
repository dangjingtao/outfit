import * as path from "path";
import * as fs from "fs";
import isMovie from "./isMovie";
import { getCharmap, BLOCK_SIZE } from "./config";

const getMovieName = (stats: string) => {
  const splitChar = getCharmap("/");
  const filename = stats.split(splitChar).pop();
  const r = filename?.split(".");
  r?.pop();
  return r?.join(".");
};

export const walkDir = async ({
  initPath,
  fileList = [],
  callback = () => {},
  blockSize = BLOCK_SIZE * 1024 * 1024,
}: {
  initPath: string;
  fileList?: any[];
  callback?: (a: any) => void;
  blockSize?: number;
}) => {
  const files = await fs.readdirSync(initPath);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileDir = path.join(initPath, file);
    const stats = fs.statSync(fileDir);
    const isFile = stats.isFile();
    const isDirectory = stats.isDirectory();
    const isMov = isMovie(fileDir);
    const sizeBlock = stats.size < blockSize;
    if (isFile && isMov && !sizeBlock) {
      callback &&
        (await callback({ fileDir, filename: getMovieName(fileDir), stats }));
      fileList.push({ fileDir, filename: getMovieName(fileDir), stats });
    }
    if (isDirectory) {
      const dirs = await walkDir({
        initPath: fileDir,
        fileList: [],
        callback,
        blockSize,
      });
      fileList.push(...dirs);
    }
  }

  return fileList;
};

export default walkDir;
