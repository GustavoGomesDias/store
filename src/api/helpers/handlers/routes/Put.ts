/* eslint-disable @typescript-eslint/no-unused-vars */

import { IApiRouterDefinition } from 'src/api/global/IApi';

/**
 * @param path The path for put route
 */

export const Put = (path: string) => (target: any, key: string, descriptor: PropertyDescriptor): void => {
  if (!Reflect.hasMetadata('routes', target.constructor)) {
    Reflect.defineMetadata('routes', [], target.constructor);
  }
  const routes = Reflect.getMetadata('routes', target.constructor) as Array<IApiRouterDefinition>;
  routes.push({
    method: 'put',
    path,
    controllerMethod: key,
  });
  Reflect.defineMetadata('routes', routes, target.constructor);
};
