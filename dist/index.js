#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemon_1 = __importDefault(require("nodemon"));
const concurrently_1 = __importDefault(require("concurrently"));
const chalk_1 = __importDefault(require("chalk"));
//process.chdir("C:\\Repos\\NdsNext");
nodemon_1.default({
    watch: ["dist"],
    ext: "js",
    exec: "yalc push --changed"
    //delay: 1000
});
nodemon_1.default
    .on("start", function () {
    console.log(`${chalk_1.default.magentaBright("yalc-watch has started")}`);
})
    .on("quit", function () {
    //console.log("App has quit");
    process.exit();
})
    .on("restart", function (files) {
    console.log(chalk_1.default.blueBright("Found changes in files: ", files));
    console.log(chalk_1.default.blueBright("Trying to push new yalc package..."));
});
concurrently_1.default(["tsc --watch"]);
//# sourceMappingURL=index.js.map