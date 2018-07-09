export interface RouteConfigInterface {
    urls: string[];
    dataPath: string;
    plugins: NamedPluginInterface;
}
export interface NamedPluginInterface {
    [key: string]: string;
}
