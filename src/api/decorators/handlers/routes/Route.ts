/**
 * @param prefix - The router prefix (for exemple: '/user', where the route is called with '/user')
 */

export const Route = (prefix: string): ClassDecorator => (target) => {
  Reflect.defineMetadata('prefix', prefix, target);
};
