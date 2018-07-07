#!/usr/bin/env node

const ROUTES = require('./routes.json');
const validator = require('./src/index');

validator(ROUTES);