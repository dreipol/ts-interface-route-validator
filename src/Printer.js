const chalk = require('chalk');
const figures = require('figures');

const ERRORS = require('./ERRORTYPES');

const FIG_MAP = {
    [ERRORS.WARNING]: figures.warning,
    [ERRORS.ERROR]: figures.cross,
};

module.exports = function (url, endpointResults) {
    console.log(chalk.blue(`API ${url} results`));

    printEndpointResult(endpointResults);
};

function printEndpointResult(endpointResult) {
    endpointResult.map((result) => {
        if (result.valid) {
            printValid(result)
        } else {
            printError(result)
        }
    });
}

function printError(result) {
    result.errors.map(error => {
        if (result.interfaceName) {
            console.log(chalk.red(`${FIG_MAP[result.errType]} ${result.interfaceName} ${result.plugin.type} ${error.message}`));
        } else {
            console.log(chalk.yellow(`${FIG_MAP[result.errType]} ${error.message}`));
        }
    });
}

function printValid(result) {
    console.log(chalk.green(`${figures.tick} ${result.interfaceName} ${result.plugin.type}`));
}
