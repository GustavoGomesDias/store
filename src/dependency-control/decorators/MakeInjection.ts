import { dependencyFactory } from '@DI/dependencyFactory';

export const MakeInjection = () => function injectionTarget <T extends { new(...args: any[]): {} }>(constructor: T): T | void {
  dependencyFactory();
};
