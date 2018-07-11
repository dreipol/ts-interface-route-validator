import Ajv from 'ajv';

import {PluginInterface} from '../Interfaces/PluginInterface';

import {getInterfaceSchema} from '../InterfaceSchemaLoader';
import {ValidationResultInterface} from '../Interfaces/ValidationResultInterface';
import {InterfaceNameResolveFunction} from '../Interfaces/InterfaceNameResolveFunction';

let cachedValidations = new Map();

export async function validatePlugins(searchPath: string, apiPlugins: PluginInterface[], interfaceNameResolve: InterfaceNameResolveFunction): Promise<ValidationResultInterface[]> {
    const filteredPlugins = apiPlugins.filter((apiPlugin) => {
        return !cachedValidations.has(apiPlugin.type);
    });

    const checks = filteredPlugins.map((apiPlugin) => {
        return validatePlugin(searchPath, apiPlugin, interfaceNameResolve);
    });

    return await Promise.all(checks);
}

export function clearCache(){
    cachedValidations.clear();
}

export async function validatePlugin(searchPath: string, apiPlugin: PluginInterface, interfaceNameResolve: InterfaceNameResolveFunction): Promise<ValidationResultInterface> {
    const interfaceName = interfaceNameResolve(apiPlugin);
    const result = await validatePluginWithInterface(searchPath, interfaceName, apiPlugin);
    cachedValidations.set(apiPlugin.type, result);
    return result;
}

export async function validatePluginWithInterface(searchPath: string, interfaceName: string, apiPlugin: PluginInterface): Promise<ValidationResultInterface> {
    const schema = await getInterfaceSchema(searchPath, interfaceName);

    if (!schema) {
        return {
            plugin: apiPlugin,
            valid: false,
            messages: [
                {
                    params: {},
                    schemaPath: '',
                    dataPath: '',
                    keyword: '',
                    message: `No Interface for ${apiPlugin.type}/${interfaceName}`
                }
            ],
        };
    }

    const ajv = new Ajv({allErrors: true});
    const validate = ajv.compile(schema);
    const valid = validate(apiPlugin);

    return {
        plugin: apiPlugin,
        valid: !!valid,
        interfaceName,
        messages: validate.errors || [],
    };
}
