import request from 'request';
import {get} from 'lodash';

/**
 *
 * @param {string} url
 * @param {string} dataPath
 */
export async function getApiData(url: string, dataPath: string): Promise<any> {
    return new Promise((res, rej) => {
        return request.get(url, (err, resp, data) => {
            if (err) {
                return rej(err);
            }

            try {
                data = JSON.parse(data);
                const plugins = get(data, dataPath);
                if (!plugins) {
                    return rej(Error(`No plugins found at ${dataPath}`));
                }
                return res(plugins);
            } catch (e) {
                return rej(e);
            }
        });
    });
}
