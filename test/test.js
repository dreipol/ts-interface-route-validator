const ROUTES = require('./routes.json');
const { validateRoutes } = require('../dist/index');
const searchPath = `${process.cwd()}/**/*.ts`;

validateRoutes(searchPath, ROUTES);
