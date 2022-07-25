/* eslint-disable max-classes-per-file */
import Encrypt from '@adapters/services/Encrypt';
import * as dependency from '@inject/Inject';
import * as factory from '@mocks/DI/factory';
import { DependencyError } from '@err/DependencyError';
import Container from '@DI/Container';

describe('@Inject tests', () => {
  @dependency.Inject(['Encrypter'])
  class InjectEncrypStub {
    public readonly encrypter: Encrypt;

    constructor(encrypter?: Encrypt) {
      this.encrypter = encrypter as Encrypt;
    }
  }

  beforeAll(() => jest.clearAllMocks());

  test('Should inject encrypt in a stub class', async () => {
    factory.default();
    const stub = new InjectEncrypStub();

    expect(await stub.encrypter.encrypt('test')).toEqual('hash');
  });

  test('Should throw DependencyError if not have a parameter key in dependencies', async () => {
    // eslint-disable-next-line dot-notation
    Container['injectionRecord'].clear();
    // eslint-disable-next-line no-new

    const instaceFunction = () => new InjectEncrypStub();

    expect(instaceFunction).toThrow(DependencyError);
  });
});
