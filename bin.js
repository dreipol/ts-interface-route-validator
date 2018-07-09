#!/usr/bin/env node

const ROUTES = require('./routes.json');
const validator = require('./dist/index');

validator(ROUTES);
