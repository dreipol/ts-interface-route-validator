# ts-interface-route-validator

Module to validate API responses against TypeScript interfaces

# Install

    npm i @dreipol/ts-interface-route-validator

# Setup
First create a file to execute the validator.

    const ROUTES = require('./routes.json'); // load the config file
    const { validateRoutes } = require('@dreipol/ts-interface-route-validator'); // include the validator
    const searchPath = `${process.cwd()}/**/*.ts`; // point to the location where your interfaces are stored
    
    validateRoutes(searchPath, ROUTES);
    
If you don't want to use the default interface name generator you can pass your own function as third parameter.
The default function will access the `plugin.type` property and transform the type string into an interface name.

`dyn-title-lead` will be transformed to `ITitleLeadPlugin`

If you wan't to use a custom generator you can to it like this


    function getInterfaceName(plugin: PluginInterface): string {
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
    
    validateRoutes(searchPath, ROUTES, getInterfaceName);


    
The code above will print the following in your CLI

    ✔ IVideoTeaserPlugin dyn-video-teaser
    ✔ ITitleLeadPlugin dyn-title-lead
    ✔ IServiceTeaserPlugin dyn-service-teaser
    ✖ http://localhost:8000/en/api/pages - NewsTeaserPlugin NewsTeaserPlugin.content.news[0] should NOT have additional properties  {"additionalProperty":"date"}
    ✖ http://localhost:8000/en/api/pages - NewsTeaserPlugin NewsTeaserPlugin.content.news[1] should NOT have additional properties  {"additionalProperty":"date"}
    ✖ http://localhost:8000/en/api/pages/about-us - No Interface for dyn-team-list

    
## Config
There is a simple config file required. In the example above it's the `routes.json` file. In there we 
define a couple of routes/api endpoints we want to validate. In Addition we have to provide a `dataPath`.
This path is required to access the data of the returned response.


    [
        {
            "urls": [
                "http://localhost:8000/en/api/pages",
                "http://localhost:8000/en/api/pages/about-us"
            ],
            "dataPath": "data.containers.main.plugins"
        }
    ]
