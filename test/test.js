const ROUTES = require('./routes.json');
const { validateRoutes } = require('../dist/index');
const searchPath = `${process.cwd()}/**/*.ts`;
var nock = require('nock');


nock('http://localhost:8000')
    .get('/en/api/pages')
    .reply(200, require('./data.json'));


validateRoutes(searchPath, ROUTES);
