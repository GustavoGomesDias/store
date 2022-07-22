import Container from '@DI/Container';
import { dependencyFactory } from '@DI/dependencyFactory';

export const Inject = (injections: string[]) => function injectionTarget <T extends { new(...args: any[]): {} }>(constructor: T): T | void {
  dependencyFactory();
  return class extends constructor {
    constructor(...args: any[]) {
      const injectedArgs: any[] = injections.map((key) => Container.get(key));
      super(...injectedArgs);
    }
  };
};
