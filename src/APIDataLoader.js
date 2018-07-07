const request = require('request');
const { get } = require('lodash');

/**
 *
 * @param {string} url
 * @param {string} dataPath
 */
module.exports = async function (url, dataPath) {
    return new Promise((res, rej) => {
        request.get(url, (err, resp, data) => {
            if (err) {
                return rej(err);
            }

            data = JSON.parse(data);
            const plugins = get(data, dataPath);
            if (!plugins) {
                return rej(Error(`No plugins found at ${dataPath}`));
            }
            return res(plugins);
        });
    });
};
