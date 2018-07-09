export interface RouteConfigInterface {
    urls: string[];
    dataPath: string;
    definitions: PluginDefinitions;
    definition?: string;
}
export interface PluginDefinitions {
    [key: string]: string;
}
