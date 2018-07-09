import { PluginInterface } from '../Interfaces/PluginInterface';
import { PluginDefinitions } from '../Interfaces/RouteConfigInterface';
import { ValidationResultInterface } from '../Interfaces/ValidationResultInterface';
export declare function validatePlugins(searchPath: string, apiPlugins: PluginInterface[], pluginDefinitions: PluginDefinitions): Promise<any[]>;
export declare function validatePlugin(searchPath: string, apiPlugin: PluginInterface, pluginDefinitions: PluginDefinitions): Promise<any>;
export declare function validatePluginWithInterface(searchPath: string, interfaceName: string, apiPlugin: PluginInterface): Promise<ValidationResultInterface>;
