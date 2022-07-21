export const Controller = (prefix: string): ClassDecorator => (target) => {
  Reflect.defineMetadata('prefix', prefix, target);
};
