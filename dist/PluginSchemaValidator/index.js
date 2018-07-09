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
const lodash_1 = require("lodash");
const ajv_1 = __importDefault(require("ajv"));
const InterfaceSchemaLoader_1 = require("../InterfaceSchemaLoader");
const ERRORS = require('../ERRORTYPES');
function validatePlugins(searchPath, apiPlugins, pluginDefinitions) {
    return __awaiter(this, void 0, void 0, function* () {
        const checks = apiPlugins.map((apiPlugin) => {
            return validatePlugin(searchPath, apiPlugin, pluginDefinitions);
        });
        return yield Promise.all(checks);
    });
}
exports.validatePlugins = validatePlugins;
function validatePlugin(searchPath, apiPlugin, pluginDefinitions) {
    return __awaiter(this, void 0, void 0, function* () {
        const interfaceName = getInterfaceName(apiPlugin, pluginDefinitions);
        if (!interfaceName) {
            return {
                errType: ERRORS.WARNING,
                plugin: apiPlugin,
                valid: false,
                errors: [{ message: `No Interface for ${apiPlugin.type}` }],
            };
        }
        return yield validatePluginWithInterface(searchPath, interfaceName, apiPlugin);
    });
}
exports.validatePlugin = validatePlugin;
function validatePluginWithInterface(searchPath, interfaceName, apiPlugin) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yield InterfaceSchemaLoader_1.getInterfaceSchema(searchPath, interfaceName);
        const ajv = new ajv_1.default({ allErrors: true });
        const validate = ajv.compile(schema);
        const valid = validate(apiPlugin);
        return {
            errType: ERRORS.ERROR,
            plugin: apiPlugin,
            valid: !!valid,
            interfaceName,
            errors: validate.errors,
        };
    });
}
exports.validatePluginWithInterface = validatePluginWithInterface;
function getInterfaceName(plugin, pluginDefinitions) {
    return lodash_1.get(pluginDefinitions, plugin.type);
}
//# sourceMappingURL=index.js.map