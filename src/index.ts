// const regex = /[A-Z]{2,5}-\d{3,4}[A-Z]?/i
import walkDir from "./walkdir";
import getOutfit from "./getOutfit";
// import * as fs from "fs";
export { walkDir } from "./walkdir";
export { getOutfit } from "./getOutfit";

export const indexMovie = async ({
  initPath,
  blockSize,
  callback,
}: {
  initPath: string;
  blockSize?: number;
  callback?: any;
}) => {
  const list = await walkDir({
    initPath,
    fileList: [],
    callback,
    blockSize,
  });

  const complete: any = [];
  const unComplete: any = [];
  list.forEach((item) => {
    const { filename, fileDir } = item;
    const res = getOutfit(filename);

    if (res) {
      complete.push({ outfit: res, fileDir });
    } else {
      unComplete.push({ filename, fileDir });
    }
  });

  // console.log(complete.length / (unComplete.length + complete.length));
  // fs.writeFileSync("./output.json", JSON.stringify({ complete, unComplete }));
  return { complete, unComplete };
};

export const indexMovies = async ({
  initPath,
  blockSize,
  onIndex,
}: {
  initPath: string;
  blockSize?: number;
  onIndex?: any;
}) => {
  const complete: any = [];
  const unComplete: any = [];
  await walkDir({
    initPath,
    fileList: [],
    callback: async (item: any) => {
      const { filename, fileDir } = item;
      const res = getOutfit(filename);
      if (res) {
        complete.push({ outfit: res, fileDir });
      } else {
        unComplete.push({ filename, fileDir });
      }
      await onIndex({
        outfit: res,
        status: res ? "success" : "failed",
        ...item,
      });
    },
    blockSize,
  });

  return { complete, unComplete };
};

// export * from "./errors"
