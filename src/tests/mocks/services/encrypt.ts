/* eslint-disable @typescript-eslint/no-unused-vars */
import Encrypt from '@adapters/services/Encrypt';

const makeEncrypterStub = (): Encrypt => {
  class EncrypterStub implements Encrypt {
    async encrypt(password: string): Promise<string> {
      const hash = await Promise.resolve('hash');
      return hash;
    }

    async compare(password: string, passHashed: string): Promise<boolean> {
      const result = await Promise.resolve(true);
      return result;
    }
  }

  return new EncrypterStub();
};

export default makeEncrypterStub;
