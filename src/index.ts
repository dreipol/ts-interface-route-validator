import {NamedPluginInterface, RouteConfigInterface} from './Interfaces/RouteConfigInterface';
import {validatePlugins} from './PluginSchemaValidator';
import {getApiData} from './APIDataLoader';

import {print} from './Printer';

const ora = require('ora');

export async function validateRoutes(searchPath: string, routes: RouteConfigInterface[]): Promise<void> {
    for (let i = 0; i < routes.length; i++) {
        const {urls, plugins, dataPath} = routes[i];
        for (let c = 0; c < urls.length; c++) {
            const url = urls[c];
            await validateUrl(searchPath, url, dataPath, plugins);
        }
    }
}

async function validateUrl(searchPath: string, url: string, dataPath: string, plugins: NamedPluginInterface): Promise<void> {
    const spinner = ora('Loading...').start();
    spinner.text = `Access ${url}`;

    const apiPlugins = await getApiData(url, dataPath);
    spinner.text = `Validate ${url}`;
    const results = await validatePlugins(searchPath, apiPlugins, plugins);
    spinner.stop();
    print(url, results);
}
