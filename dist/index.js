#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemon_1 = __importDefault(require("nodemon"));
const concurrently_1 = __importDefault(require("concurrently"));
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Get package.json contents
const packageJson = JSON.parse(fs_1.default.readFileSync(path_1.default.join(process.cwd(), "package.json"), "utf8"));
// Get the yalcWatch section (if it exists)
if (packageJson.yalcWatch) {
    const yalcWatch = packageJson.yalcWatch;
    if (yalcWatch.watchFolder === undefined ||
        yalcWatch.buildWatchCommand === undefined ||
        yalcWatch.extensions === undefined)
        throw new Error('Invalid yalc watch config: "' + JSON.stringify(yalcWatch) + '"');
    nodemon_1.default({
        watch: [yalcWatch.watchFolder],
        ext: yalcWatch.extensions,
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
    concurrently_1.default([yalcWatch.buildWatchCommand]);
}
else {
    console.log(chalk_1.default.redBright("Error: yalc-watch could not find a yalcWatch section in your package.json file, exiting"));
}
//# sourceMappingURL=index.js.map