"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
const figures = require('figures');
const ERRORS = require('../ERRORTYPES');
const FIG_MAP = {
    [ERRORS.WARNING]: figures.warning,
    [ERRORS.ERROR]: figures.cross,
};
function print(url, endpointResult) {
    endpointResult.map((result) => {
        if (result.valid) {
            printValid(result);
        }
        else {
            printError(url, result);
        }
    });
}
exports.print = print;
function printError(url, result) {
    if (!result.errors) {
        return;
    }
    result.errors.map(error => {
        if (result.interfaceName) {
            console.log(chalk.red(`${FIG_MAP[result.errType]} ${url} - ${result.interfaceName} ${result.plugin.type} ${error.message}`));
        }
        else {
            console.log(chalk.yellow(`${FIG_MAP[result.errType]} ${url} - ${error.message}`));
        }
    });
}
function printValid(result) {
    console.log(chalk.green(`${figures.tick} ${result.interfaceName} ${result.plugin.type}`));
}
//# sourceMappingURL=index.js.map