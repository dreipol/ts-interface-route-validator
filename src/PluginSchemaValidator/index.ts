import {PluginInterface} from '../Interfaces/PluginInterface';
import Ajv from 'ajv';

import {getInterfaceSchema} from '../InterfaceSchemaLoader';
import {ValidationResultInterface} from '../Interfaces/ValidationResultInterface';
import {InterfaceNameResolveFunction} from '../Interfaces/InterfaceNameResolveFunction';

const ERRORS = require('../ERRORTYPES');

export async function validatePlugins(searchPath: string, apiPlugins: PluginInterface[], interfaceNameResolve: InterfaceNameResolveFunction) {
    const checks = apiPlugins.map((apiPlugin) => {
        return validatePlugin(searchPath, apiPlugin, interfaceNameResolve);
    });
    return await Promise.all(checks);
}

export async function validatePlugin(searchPath: string, apiPlugin: PluginInterface, interfaceNameResolve: InterfaceNameResolveFunction): Promise<any> {
    const interfaceName = interfaceNameResolve(apiPlugin);


    return await validatePluginWithInterface(searchPath, interfaceName, apiPlugin);
}

export async function validatePluginWithInterface(searchPath: string, interfaceName: string, apiPlugin: PluginInterface): Promise<ValidationResultInterface> {
    const schema = await getInterfaceSchema(searchPath, interfaceName);

    if (!schema) {
        return {
            errType: ERRORS.WARNING,
            plugin: apiPlugin,
            valid: false,
            errors: [
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
        errType: ERRORS.ERROR,
        plugin: apiPlugin,
        valid: !!valid,
        interfaceName,
        errors: validate.errors,
    };
}
