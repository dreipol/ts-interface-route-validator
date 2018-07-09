import {ValidationResultInterface} from '../Interfaces/ValidationResultInterface';

const chalk = require('chalk');
const figures = require('figures');

const ERRORS = require('../ERRORTYPES');

const FIG_MAP: { [key: string]: string } = {
    [ERRORS.WARNING]: figures.warning,
    [ERRORS.ERROR]: figures.cross,
};

export function print(url: string, endpointResults: ValidationResultInterface[]) {
    console.log(chalk.blue(`${figures.pointer} API ${url} results`));

    printEndpointResult(endpointResults);
}

function printEndpointResult(endpointResult: ValidationResultInterface[]) {
    endpointResult.map((result) => {
        if (result.valid) {
            printValid(result);
        } else {
            printError(result);
        }
    });
}

function printError(result: ValidationResultInterface) {
    if (!result.errors) {
        return;
    }

    result.errors.map(error => {
        if (result.interfaceName) {
            console.log(chalk.red(`${FIG_MAP[result.errType]} ${result.interfaceName} ${result.plugin.type} ${error.message}`));
        } else {
            console.log(chalk.yellow(`${FIG_MAP[result.errType]} ${error.message}`));
        }
    });
}

function printValid(result: ValidationResultInterface) {
    console.log(chalk.green(`${figures.tick} ${result.interfaceName} ${result.plugin.type}`));
}
