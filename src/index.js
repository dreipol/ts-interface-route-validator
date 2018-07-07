const apiDataLoader = require('./APIDataLoader');
const pluginSchemaValidator = require('./PluginSchemaValidator');
const printer = require('./Printer');
const ora = require('ora');

/**
 *
 * @param {Array} routes
 * @return {Promise<void>}
 */
module.exports = async function (routes) {
    for (let i = 0; i < routes.length; i++) {
        const { urls, plugins, dataPath } = routes[i];
        for (let c = 0; c < urls.length; c++) {
            const url = urls[c];
            await validateUrl(url, dataPath, plugins);
        }
    }
};

async function validateUrl(url, dataPath, plugins) {
    const spinner = ora('Loading...').start();
    spinner.text = `Access ${url}`;

    const apiPlugins = await apiDataLoader(url, dataPath);
    spinner.text = `Validate ${url}`;
    const results = await pluginSchemaValidator(apiPlugins, plugins);
    spinner.stop();
    printer(url, results);
}
