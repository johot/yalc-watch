#!/usr/bin/env node
"use strict";
import nodemon from "nodemon";
import concurrently from "concurrently";
import chalk from "chalk";

interface YalcWatchConfig {
  watchFolder: string;
  buildWatchCommand: string;
}

nodemon({
  watch: ["dist"],
  ext: "js",
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

concurrently(["tsc --watch"]);
