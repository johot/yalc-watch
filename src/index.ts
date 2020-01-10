#!/usr/bin/env node
"use strict";
import nodemon from "nodemon";
import concurrently from "concurrently";
import chalk from "chalk";
import fs from "fs";
import path from "path";

interface YalcWatchConfig {
  watchFolder: string;
  buildWatchCommand: string;
  extensions: string;
}

// Get package.json contents
const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"));

// Get the yalcWatch section (if it exists)
if (packageJson.yalcWatch) {
  const yalcWatch: YalcWatchConfig = packageJson.yalcWatch;

  if (
    yalcWatch.watchFolder === undefined ||
    yalcWatch.buildWatchCommand === undefined ||
    yalcWatch.extensions === undefined
  )
    throw new Error('Invalid yalc watch config: "' + JSON.stringify(yalcWatch) + '"');

  nodemon({
    watch: [yalcWatch.watchFolder],
    ext: yalcWatch.extensions,
    exec: "yalc push --changed"
    //delay: 1000
  });

  nodemon
    .on("start", function() {
      console.log(`${chalk.magentaBright("yalc-watch has started")}`);
    })
    .on("quit", function() {
      //console.log("App has quit");
      process.exit();
    })
    .on("restart", function(files: any) {
      console.log(chalk.blueBright("Found changes in files: ", files));
      console.log(chalk.blueBright("Trying to push new yalc package..."));
    });

  concurrently([yalcWatch.buildWatchCommand]);
} else {
  console.log(
    chalk.redBright("Error: yalc-watch could not find a yalcWatch section in your package.json file, exiting")
  );
}
