"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const isMovie = (stats) => {
    const arr = stats.split(".");
    const sufix = arr.pop() || "";
    return config_1.MOVIE_TYPES.includes(sufix.toLowerCase());
};
exports.default = isMovie;
