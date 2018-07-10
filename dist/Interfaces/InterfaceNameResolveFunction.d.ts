import { PluginInterface } from './PluginInterface';
export interface InterfaceNameResolveFunction {
    (plugin: PluginInterface): string;
}
