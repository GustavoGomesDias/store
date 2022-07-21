/* eslint-disable @typescript-eslint/no-unused-vars */

import { IApiRouterDefinition } from '@global/IApi';

const Post = (path: string) => (target: any, key: string, descriptor: PropertyDescriptor): void => {
  if (!Reflect.hasMetadata('routes', target.constructor)) {
    Reflect.defineMetadata('routes', [], target.constructor);
  }
  const routes = Reflect.getMetadata('routes', target.constructor) as Array<IApiRouterDefinition>;
  routes.push({
    method: 'post',
    path,
    controllerMethod: key,
  });
  Reflect.defineMetadata('routes', routes, target.constructor);
};

export default Post;
