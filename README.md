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
    
    
The code above will print the following in your CLI

    ❯ API http://localhost:8000/en/api/pages results
    ✔ IVideoTeaserPlugin dyn-video-teaser
    ✖ IVideoTeaserPlugin dyn-title-lead should have required property 'link'
    ✖ No Interface for dyn-service-teaser
    ✖ No Interface for dyn-news-teaser
    ❯ API http://localhost:8000/en/api/pages/about-us results
    ✖ No Interface for dyn-team-list
    
## Config
There is a simple config file required. In the example above it's the `routes.json` file. In there we 
define a couple of routes/api endpoints we want to validate. In Addition we have to provide a `dataPath`.
This path is required to access the data of the returned response.
The `plugins` object, is a simple key value map. It maps the plugin types to the interface names.


    [
        {
            "urls": [
                "http://localhost:8000/en/api/pages",
                "http://localhost:8000/en/api/pages/about-us"
            ],
            "dataPath": "data.containers.main.plugins",
            "definition": {
                "dyn-title-lead": "IVideoTeaserPlugin",
                "dyn-video-teaser": "IVideoTeaserPlugin"
            }
        }
    ]

if you want to validate a single object from the response, you can configure it like this


    {
        "urls": [
            "http://localhost:3000/en/api/pages/?partials=footer"
        ],
        "dataPath": "partials.footer",
        "definition":  "FooterInterface"
    }
