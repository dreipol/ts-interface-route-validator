"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const lodash_1 = require("lodash");
/**
 *
 * @param {string} url
 * @param {string} dataPath
 */
function getApiData(url, dataPath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => {
            return request_1.default.get(url, (err, resp, data) => {
                if (err) {
                    return rej(err);
                }
                try {
                    data = JSON.parse(data);
                    const plugins = lodash_1.get(data, dataPath);
                    if (!plugins) {
                        return rej(Error(`No plugins found at ${dataPath}`));
                    }
                    return res(plugins);
                }
                catch (e) {
                    console.error(url, e.message);
                    return rej(e);
                }
            });
        });
    });
}
exports.getApiData = getApiData;
//# sourceMappingURL=index.js.map