#!/usr/bin/env node
const { resolve } = require("path");
const { getProgramFromFiles, buildGenerator } = require('typescript-json-schema');
const glob = require('glob');

// optionally pass argument to schema generator
const settings = {
    required: true,
    titles: true,
    topRef: true,
};

const GLOB_SETTINGS = {
    ignore: ['**/node_modules/**'],
};

const searchPath = `${process.cwd()}/**/*.ts`;

module.exports = function (interfacename) {
    return new Promise((res, rej) => {
        glob(searchPath, GLOB_SETTINGS, (err, files) => {
            if (err) {
                throw err;
            }

            const program = getProgramFromFiles(files);
            const generator = buildGenerator(program, settings);

            const schema = generator.getSchemaForSymbol(interfacename, true);
            delete schema.$schema;
            return res(schema);
        });
    });
};
