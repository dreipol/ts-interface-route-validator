import {PluginInterface} from '../Interfaces/PluginInterface';
import {PluginDefinitions} from '../Interfaces/RouteConfigInterface';
import {get} from 'lodash';
import Ajv from 'ajv';

import {getInterfaceSchema} from '../InterfaceSchemaLoader';
import {ValidationResultInterface} from '../Interfaces/ValidationResultInterface';

const ERRORS = require('../ERRORTYPES');

export async function validatePlugins(searchPath: string, apiPlugins: PluginInterface[], pluginDefinitions: PluginDefinitions) {
    const checks = apiPlugins.map((apiPlugin) => {
            return validatePlugin(searchPath, apiPlugin, pluginDefinitions);
    });
    return await Promise.all(checks)
}

export async function validatePlugin(searchPath: string, apiPlugin: PluginInterface, pluginDefinitions: PluginDefinitions): Promise<any> {
    const interfaceName = getInterfaceName(apiPlugin, pluginDefinitions);
    if (!interfaceName) {
        return {
            errType: ERRORS.WARNING,
            plugin: apiPlugin,
            valid: false,
            errors: [{message: `No Interface for ${apiPlugin.type}`}],
        };
    }
    return await validatePluginWithInterface(searchPath, interfaceName, apiPlugin);
}

export async function validatePluginWithInterface(searchPath: string, interfaceName: string, apiPlugin: PluginInterface): Promise<ValidationResultInterface>{
    const schema = await getInterfaceSchema(searchPath, interfaceName);

    const ajv = new Ajv({allErrors: true});
    const validate = ajv.compile(schema);
    const valid = validate(apiPlugin);

    return {
        errType: ERRORS.ERROR,
        plugin: apiPlugin,
        valid: !!valid,
        interfaceName,
        errors: validate.errors,
    };
}

function getInterfaceName(plugin: PluginInterface, pluginDefinitions: PluginDefinitions) {
    return get(pluginDefinitions, plugin.type);
}
