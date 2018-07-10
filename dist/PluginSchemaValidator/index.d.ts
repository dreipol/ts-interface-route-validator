import { PluginInterface } from '../Interfaces/PluginInterface';
import { ValidationResultInterface } from '../Interfaces/ValidationResultInterface';
import { InterfaceNameResolveFunction } from '../Interfaces/InterfaceNameResolveFunction';
export declare function validatePlugins(searchPath: string, apiPlugins: PluginInterface[], interfaceNameResolve: InterfaceNameResolveFunction): Promise<any[]>;
export declare function validatePlugin(searchPath: string, apiPlugin: PluginInterface, interfaceNameResolve: InterfaceNameResolveFunction): Promise<any>;
export declare function validatePluginWithInterface(searchPath: string, interfaceName: string, apiPlugin: PluginInterface): Promise<ValidationResultInterface>;
