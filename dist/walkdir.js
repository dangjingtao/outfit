"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walkDir = void 0;
const path = require("path");
const fs = require("fs");
const isMovie_1 = require("./isMovie");
const config_1 = require("./config");
const getMovieName = (stats) => {
    const splitChar = (0, config_1.getCharmap)("/");
    const filename = stats.split(splitChar).pop();
    const r = filename === null || filename === void 0 ? void 0 : filename.split(".");
    r === null || r === void 0 ? void 0 : r.pop();
    return r === null || r === void 0 ? void 0 : r.join(".");
};
const walkDir = async ({ initPath, fileList = [], callback = () => { }, blockSize = config_1.BLOCK_SIZE * 1024 * 1024, }) => {
    const files = await fs.readdirSync(initPath);
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileDir = path.join(initPath, file);
        const stats = fs.statSync(fileDir);
        const isFile = stats.isFile();
        const isDirectory = stats.isDirectory();
        const isMov = (0, isMovie_1.default)(fileDir);
        const sizeBlock = stats.size < blockSize;
        if (isFile && isMov && !sizeBlock) {
            callback && callback(stats);
            fileList.push({ fileDir, filename: getMovieName(fileDir), stats });
        }
        if (isDirectory) {
            const dirs = await (0, exports.walkDir)({
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
exports.walkDir = walkDir;
