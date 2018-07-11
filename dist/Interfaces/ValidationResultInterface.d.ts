import { PluginInterface } from './PluginInterface';
import { ErrorObject } from 'ajv';
export interface ValidationResultInterface {
    plugin: PluginInterface;
    valid: boolean;
    messages: ErrorObject[];
    interfaceName?: string;
}
