export const Route = (prefix: string): ClassDecorator => (target) => {
  Reflect.defineMetadata('prefix', prefix, target);
};
