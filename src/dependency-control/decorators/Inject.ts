import Container from '@DI/Container';
import { DependencyError } from '@err/DependencyError';

/**
 *
 * @param injections A list of injection ID's. You must pass dependencies that have already been signed in the Container
 * @return A class that extends passed by parameter
 *
 *
 * @example Inject an encrypter in the class
 *
 * ```typescript
 * @Inject(['Example'])
 * class Injection {
 *  public example: Exemaple;
 *  constructor(exemple?: Example) {
 *    this.example = example
 *  }
 * }
 * ```
 */

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
