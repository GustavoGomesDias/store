import Container from '@DI/Container';

export const Inject = (injections: string[]) => function injectionTarget <T extends { new(...args: any[]): {} }>(constructor: T): T | void {
  return class extends constructor {
    constructor(...args: any[]) {
      const injectedArgs: any[] = injections.map((key) => Container.get(key));
      super(...injectedArgs);
    }
  };
};
