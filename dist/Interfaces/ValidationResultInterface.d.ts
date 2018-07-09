import { PluginInterface } from './PluginInterface';
import { ErrorObject } from 'ajv';
export interface ValidationResultInterface {
    errType: string;
    plugin: PluginInterface;
    valid: boolean;
    errors?: null | ErrorObject[];
    interfaceName?: string;
}
export interface ValidationErrorInterface {
    [key: string]: string;
    message: string;
}
