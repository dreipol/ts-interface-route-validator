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
const { getProgramFromFiles, buildGenerator } = require('typescript-json-schema');
const glob = require('glob');
// optionally pass argument to schema generator
const settings = {
    required: true,
    titles: true,
    topRef: true,
    ref: true,
    noExtraProps: true,
    ignoreErrors: false
};
const GLOB_SETTINGS = {
    ignore: ['**/node_modules/**'],
};
function getInterfaceSchema(searchPath, interfaceName) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield getFiles(searchPath);
        const program = getProgramFromFiles(files);
        const generator = buildGenerator(program, settings);
        if (generator) {
            try {
                const schema = generator.getSchemaForSymbol(interfaceName, true);
                delete schema.$schema;
                return schema;
            }
            catch (e) {
                return null;
            }
        }
        throw new Error('No generator created');
    });
}
exports.getInterfaceSchema = getInterfaceSchema;
function getFiles(searchPath) {
    return new Promise((res, rej) => {
        glob(searchPath, GLOB_SETTINGS, (err, files) => {
            if (err) {
                return rej(err);
            }
            return res(files);
        });
    });
}
//# sourceMappingURL=index.js.map