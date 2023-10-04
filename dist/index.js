"use strict";
// const regex = /[A-Z]{2,5}-\d{3,4}[A-Z]?/i
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOutfit = exports.walkDir = void 0;
const outfit = () => {
    console.log("hehe");
};
exports.default = outfit;
// For CommonJS default export support
// export * from "./errors"
var walkdir_1 = require("./walkdir");
Object.defineProperty(exports, "walkDir", { enumerable: true, get: function () { return walkdir_1.walkDir; } });
var getOutfit_1 = require("./getOutfit");
Object.defineProperty(exports, "getOutfit", { enumerable: true, get: function () { return getOutfit_1.getOutfit; } });
