#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
commander_1.default.version(getLivePackageVersion());
commander_1.default
    .command("<watchFolder>")
    .description("start watching for changes in the specified folder")
    .action(watchFolder => {
    console.log("Folder was", watchFolder);
});
commander_1.default.parse(process.argv);
function getLivePackageVersion() {
    try {
        const packageJson = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "package.json"), "utf8"));
        return packageJson.version;
    }
    catch (ex) {
        return "??? -> " + ex.toString();
    }
}
exports.getLivePackageVersion = getLivePackageVersion;
//# sourceMappingURL=cli.js.map