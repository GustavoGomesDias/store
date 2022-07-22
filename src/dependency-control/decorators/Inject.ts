import Container from '@DI/Container';
import { DependencyError } from '@err/DependencyError';

export const Inject = (injections: string[]) => function injectionTarget <T extends { new(...args: any[]): {} }>(constructor: T): T | void {
  return class extends constructor {
    constructor(...args: any[]) {
      const injectedArgs: any[] = injections.map((key) => {
        if (!Container.hashProperty(key)) {
          throw new DependencyError(`Not possible injectiong: ${key}`);
        }

        return Container.get(key);
      });
      super(...injectedArgs);
    }
  };
};
