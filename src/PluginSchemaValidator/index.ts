import {PluginInterface} from '../Interfaces/PluginInterface';
import {NamedPluginInterface} from '../Interfaces/RouteConfigInterface';
import {get} from 'lodash';
import Ajv from 'ajv';

import {getInterfaceSchema} from '../InterfaceSchemaLoader';

const ERRORS = require('../ERRORTYPES');

export async function validatePlugins(searchPath: string, apiPlugins: PluginInterface[], pluginDefinitions: NamedPluginInterface) {
    const checks = apiPlugins.map((plugin) => {
        return validatePlugin(searchPath, plugin, pluginDefinitions);
    });
    return await Promise.all(checks);
}

async function validatePlugin(searchPath: string, plugin: PluginInterface, pluginDefinitions: NamedPluginInterface): Promise<any> {
    const interfaceName = getInterfaceName(plugin, pluginDefinitions);
    if (!interfaceName) {
        return {
            errType: ERRORS.WARNING,
            plugin,
            valid: false,
            errors: [{message: `No Interface for ${plugin.type}`}],
        };
    }

    const schema = await getInterfaceSchema(searchPath, interfaceName);

    const ajv = new Ajv({allErrors: true});
    const validate = ajv.compile(schema);
    const valid = validate(plugin);

    return {
        errType: ERRORS.ERROR,
        plugin,
        valid,
        interfaceName,
        errors: validate.errors,
    };
}

function getInterfaceName(plugin: PluginInterface, pluginDefinitions: NamedPluginInterface) {
    return get(pluginDefinitions, plugin.type);
}
