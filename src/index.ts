import {PluginDefinitions, RouteConfigInterface} from './Interfaces/RouteConfigInterface';
import {validatePlugins, validatePluginWithInterface} from './PluginSchemaValidator';
import {getApiData} from './APIDataLoader';

import {print} from './Printer';

export async function validateRoutes(searchPath: string, routes: RouteConfigInterface[]): Promise<void> {
    for (let i = 0; i < routes.length; i++) {
        const {urls, definitions, dataPath, definition} = routes[i];
        for (let c = 0; c < urls.length; c++) {
            const url = urls[c];
            await validateUrl(searchPath, url, dataPath, definitions, definition);
        }
    }
}

async function validateUrl(searchPath: string, url: string, dataPath: string, definitions: PluginDefinitions, definition?: string): Promise<void> {
    const apiPlugins = await getApiData(url, dataPath);

    let results = null;
    if (definition && !Array.isArray(apiPlugins)) {
        results = [await validatePluginWithInterface(searchPath, definition, apiPlugins)];
    } else {
        results = await validatePlugins(searchPath, apiPlugins, definitions);
    }

    if (!results) {
        return;
    }

    print(url, results);
}
