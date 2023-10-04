"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharmap = exports.isMac = exports.BLOCK_SIZE = exports.MOVIE_TYPES = void 0;
exports.MOVIE_TYPES = [
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
exports.BLOCK_SIZE = 200;
exports.isMac = process.platform !== "darwin";
const getCharmap = (key) => {
    const charmap = {
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
    return exports.isMac ? key : charmap[key] || key;
};
exports.getCharmap = getCharmap;
