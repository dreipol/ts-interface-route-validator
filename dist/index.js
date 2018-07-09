"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PluginSchemaValidator_1 = require("./PluginSchemaValidator");
const APIDataLoader_1 = require("./APIDataLoader");
const Printer_1 = require("./Printer");
const ora = require('ora');
function validateRoutes(searchPath, routes) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < routes.length; i++) {
            const { urls, plugins, dataPath } = routes[i];
            for (let c = 0; c < urls.length; c++) {
                const url = urls[c];
                yield validateUrl(searchPath, url, dataPath, plugins);
            }
        }
    });
}
exports.validateRoutes = validateRoutes;
function validateUrl(searchPath, url, dataPath, plugins) {
    return __awaiter(this, void 0, void 0, function* () {
        const spinner = ora('Loading...').start();
        spinner.text = `Access ${url}`;
        const apiPlugins = yield APIDataLoader_1.getApiData(url, dataPath);
        spinner.text = `Validate ${url}`;
        const results = yield PluginSchemaValidator_1.validatePlugins(searchPath, apiPlugins, plugins);
        spinner.stop();
        Printer_1.print(url, results);
    });
}
//# sourceMappingURL=index.js.map