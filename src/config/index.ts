export const MOVIE_TYPES = [
  "3gp",
  "f4v",
  "flv",
  "m2ts",
  "m4v",
  "mov",
  "mp4",
  "mpeg",
  "vob",
  "ts",
  "wmv",
  "webm",
  "avi",
  "mov",
  "rmvb",
  "rm",
  "mkv",
];

export const BLOCK_SIZE = 200;
export const isMac = process.platform !== "darwin";
export const getCharmap = (key: string): string => {
  const charmap: any = {
    "<": "❮",
    ">": "❯",
    ":": "：",
    '"': "″",
    "/": "\\",
    "\\": "＼",
    "|": "｜",
    "?": "？",
    "*": "꘎",
  };

  return isMac ? key : charmap[key] || key;
};
