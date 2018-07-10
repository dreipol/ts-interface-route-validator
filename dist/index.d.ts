import { RouteConfigInterface } from './Interfaces/RouteConfigInterface';
import { InterfaceNameResolveFunction } from './Interfaces/InterfaceNameResolveFunction';
export declare function validateRoutes(searchPath: string, routes: RouteConfigInterface[], interfaceNameResolve?: InterfaceNameResolveFunction): Promise<void>;
