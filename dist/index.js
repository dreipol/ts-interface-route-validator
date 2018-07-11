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
function validateRoutes(searchPath, routes, interfaceNameResolve = getInterfaceName) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < routes.length; i++) {
            const { urls, dataPath } = routes[i];
            for (let c = 0; c < urls.length; c++) {
                const url = urls[c];
                yield validateUrl(searchPath, url, dataPath, interfaceNameResolve);
            }
        }
    });
}
exports.validateRoutes = validateRoutes;
function clearPluginCache() {
    PluginSchemaValidator_1.clearCache();
}
exports.clearPluginCache = clearPluginCache;
function validateUrl(searchPath, url, dataPath, interfaceNameResolve) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiPlugins = yield APIDataLoader_1.getApiData(url, dataPath);
        const results = yield PluginSchemaValidator_1.validatePlugins(searchPath, apiPlugins, interfaceNameResolve);
        if (results) {
            Printer_1.print(url, results);
        }
    });
}
function getInterfaceName(plugin) {
    let interfaceNames = plugin.type
        .replace('dyn', '')
        .replace(/-\w/ig, (chr) => {
        return chr.toUpperCase();
    })
        .split('-');
    interfaceNames.unshift('I');
    interfaceNames.push('Plugin');
    return interfaceNames.join('');
}
//# sourceMappingURL=index.js.map