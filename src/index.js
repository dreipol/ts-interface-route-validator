#!/usr/bin/env node

const request = require('request');
const Ajv = require('ajv');
const { get } = require('lodash');
const interfaceSchemaLoader = require('./InterfaceSchemaLoader.js');


const ROUTES = require('./routes.json');

ROUTES.map(({ url, path, interfaceName }) => {
    interfaceSchemaLoader(interfaceName)
        .then((schema) => {
            validateRoute(url, path, schema, interfaceName);
        });
});


function validateRoute(url, dataPath, schema, interfaceName) {
    request.get(url, (err, resp, data) => {
        if (err) {
            throw err;
        }

        data = JSON.parse(data);

        var ajv = new Ajv({ allErrors: true });
        var validate = ajv.compile(schema);
        var valid = validate(get(data, dataPath), dataPath);

        if (!valid) {
            validate.errors.map(err => {
                console.error(`${err.dataPath} does not match ${interfaceName}`);
                console.debug(err.message);
            });
        }
    });
}