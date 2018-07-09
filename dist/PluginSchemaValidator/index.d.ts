import { PluginInterface } from '../Interfaces/PluginInterface';
import { NamedPluginInterface } from '../Interfaces/RouteConfigInterface';
export declare function validatePlugins(searchPath: string, apiPlugins: PluginInterface[], pluginDefinitions: NamedPluginInterface): Promise<any[]>;
