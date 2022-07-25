/* eslint-disable no-new */
import * as factory from '@DI/dependencyFactory';
import { MakeDependencies } from '@inject/MakeDependencies';

describe('@MakeDependencies tests', () => {
  @MakeDependencies()
  class Application {}

  test('Should call dependency factory', () => {
    const spy = jest.spyOn(factory, 'dependencyFactory');

    MakeDependencies()(undefined as any);
    expect(spy).toHaveBeenCalled();
  });
});
