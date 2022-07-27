import { dependencyFactory } from '@DI/dependencyFactory';
/**
 *
 * @description In this case, way necessary add a decorator for dependency factory. This decorator needs to be placed at the start of the application.
 *
 * @example
 * For express
 * ```ts
 * @MakeDependencies()
 * class App {
 * ```
 */
export const MakeDependencies = () => function injectionTarget <T extends { new(...args: any[]): {} }>(constructor: T): T | void {
  dependencyFactory();
};
