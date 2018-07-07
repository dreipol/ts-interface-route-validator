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

const searchPath = `${process.cwd()}/**/*.ts`;

module.exports = async function (interfacename) {
    const files = await getFiles();
    const program = getProgramFromFiles(files);
    const generator = buildGenerator(program, settings);

    if(generator) {
        const schema = generator.getSchemaForSymbol(interfacename, true);
        delete schema.$schema;
        return schema;
    }
    throw new Error('No generator created');
};


function getFiles(){
    return new Promise((res, rej) => {
        glob(searchPath, GLOB_SETTINGS, (err, files) => {
            if(err){
                return rej(err);
            }
            return res(files);
        })
    });
}
