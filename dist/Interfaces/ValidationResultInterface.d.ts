import { PluginInterface } from './PluginInterface';
export interface ValidationResultInterface {
    errType: string;
    plugin: PluginInterface;
    valid: boolean;
    errors: ValidationErrorInterface[];
    interfaceName?: string;
}
export interface ValidationErrorInterface {
    [key: string]: string;
    message: string;
}
