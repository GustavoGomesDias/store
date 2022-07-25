import { dependencyFactory } from '@DI/dependencyFactory';

export const MakeDependencies = () => function injectionTarget <T extends { new(...args: any[]): {} }>(constructor: T): T | void {
  dependencyFactory();
};
