const interfaceSchemaLoader = require('./InterfaceSchemaLoader.js');
const { get } = require('lodash');
const Ajv = require('ajv');
const ERRORS = require('./ERRORTYPES');

module.exports = async function PluginSchemaValidator(apiPlugins, pluginDefinitions) {
    const checks = apiPlugins.map((plugin) => {
        return validatePlugin(plugin, pluginDefinitions);
    });
    return await Promise.all(checks);
};

async function validatePlugin(plugin, pluginDefinitions) {
    const { type } = plugin;

    const interfaceName = get(pluginDefinitions, type);
    if (!interfaceName) {
        return {
            errType: ERRORS.WARNING,
            plugin,
            valid: false,
            errors: [{ message: `No Interface for ${plugin.type}` }],
        };

    }

    const schema = await interfaceSchemaLoader(interfaceName);

    const ajv = new Ajv({ allErrors: true });
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
