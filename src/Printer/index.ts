import {ValidationResultInterface} from '../Interfaces/ValidationResultInterface';

const chalk = require('chalk');
const figures = require('figures');


export function print(url: string, endpointResult: ValidationResultInterface[]) {
    endpointResult.map((result) => {
        printResult(url, result);
    });
}

function printResult(url: string, result: ValidationResultInterface) {
    if (result.valid) {
        console.log(chalk.green(`${figures.tick} ${result.interfaceName} ${result.plugin.type}`));
    } else {

        result.messages.map(message => {
            if (result.interfaceName && !result.valid) {
                const errorLocation = [result.interfaceName, message.dataPath].join('');
                console.log(chalk.red(`${figures.cross} ${url} - ${result.interfaceName} ${errorLocation} ${message.message}  ${JSON.stringify(message.params)}`));
            } else {
                console.log(chalk.yellow(`${figures.info} ${url} - ${message.message}`));
            }
        });
    }
}
