"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexMovies = exports.indexMovie = exports.getOutfit = exports.walkDir = void 0;
// const regex = /[A-Z]{2,5}-\d{3,4}[A-Z]?/i
const walkdir_1 = require("./walkdir");
const getOutfit_1 = require("./getOutfit");
// import * as fs from "fs";
var walkdir_2 = require("./walkdir");
Object.defineProperty(exports, "walkDir", { enumerable: true, get: function () { return walkdir_2.walkDir; } });
var getOutfit_2 = require("./getOutfit");
Object.defineProperty(exports, "getOutfit", { enumerable: true, get: function () { return getOutfit_2.getOutfit; } });
const indexMovie = async ({ initPath, blockSize, callback, }) => {
    const list = await (0, walkdir_1.default)({
        initPath,
        fileList: [],
        callback,
        blockSize,
    });
    const complete = [];
    const unComplete = [];
    list.forEach((item) => {
        const { filename, fileDir } = item;
        const res = (0, getOutfit_1.default)(filename);
        if (res) {
            complete.push({ outfit: res, fileDir });
        }
        else {
            unComplete.push({ filename, fileDir });
        }
    });
    // console.log(complete.length / (unComplete.length + complete.length));
    // fs.writeFileSync("./output.json", JSON.stringify({ complete, unComplete }));
    return { complete, unComplete };
};
exports.indexMovie = indexMovie;
const indexMovies = async ({ initPath, blockSize, onIndex, }) => {
    const complete = [];
    const unComplete = [];
    await (0, walkdir_1.default)({
        initPath,
        fileList: [],
        callback: async (item) => {
            const { filename, fileDir } = item;
            const res = (0, getOutfit_1.default)(filename);
            if (res) {
                complete.push({ outfit: res, fileDir });
            }
            else {
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
exports.indexMovies = indexMovies;
// export * from "./errors"
