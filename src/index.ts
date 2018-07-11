import {RouteConfigInterface} from './Interfaces/RouteConfigInterface';
import {validatePlugins, clearCache} from './PluginSchemaValidator';
import {getApiData} from './APIDataLoader';

import {print} from './Printer';
import {InterfaceNameResolveFunction} from './Interfaces/InterfaceNameResolveFunction';
import {PluginInterface} from './Interfaces/PluginInterface';

export async function validateRoutes(searchPath: string, routes: RouteConfigInterface[], interfaceNameResolve: InterfaceNameResolveFunction = getInterfaceName): Promise<void> {
    for (let i = 0; i < routes.length; i++) {
        const {urls, dataPath} = routes[i];
        for (let c = 0; c < urls.length; c++) {
            const url = urls[c];
            await validateUrl(searchPath, url, dataPath, interfaceNameResolve);
        }
    }
}

export function clearPluginCache(){
    clearCache();
}

async function validateUrl(searchPath: string, url: string, dataPath: string, interfaceNameResolve: InterfaceNameResolveFunction): Promise<void> {
    const apiPlugins = await getApiData(url, dataPath);
    const results = await validatePlugins(searchPath, apiPlugins, interfaceNameResolve);
    if (results) {
        print(url, results);
    }
}


function getInterfaceName(plugin: PluginInterface): string {
    let interfaceNames = plugin.type
        .replace('dyn', '')
        .replace(/-\w/ig, (chr) => {
            return chr.toUpperCase();
        })
        .split('-');
    interfaceNames.unshift('I');
    interfaceNames.push('Plugin');
    return interfaceNames.join('');
}
