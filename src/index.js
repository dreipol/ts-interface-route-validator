const apiDataLoader = require('./APIDataLoader');
const pluginSchemaValidator = require('./PluginSchemaValidator');
const printer = require('./Printer');
const ora = require('ora');

module.exports = async function (routes) {
    const spinner = ora('Loading...').start();
    const checks = routes.map(({ url, dataPath, plugins }) => {
        spinner.text = `Access ${url}`;

        return apiDataLoader(url, dataPath)
            .then((apiPlugins) => {
                spinner.text = `Validate ${url}`;
                return pluginSchemaValidator(apiPlugins, plugins);
            })
            .then( (results) => {
                return {url, results};
            })
    });

    let result = await Promise.all(checks);
    spinner.stop();
    printer(result);
};
