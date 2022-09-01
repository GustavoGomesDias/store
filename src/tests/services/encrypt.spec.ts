import Encrypt from '@services/adapters/services/Encrypt';
import bcrypt from 'bcrypt';
import BcryptService from '@services/BcryptService';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    const result: string = await Promise.resolve('hash');
    return result;
  },

  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    const result = await Promise.resolve(true);

    return result;
  },

}));

const makeSut = (): Encrypt => new BcryptService();

describe('Bcrypt Service', () => {
  test('Should call with correct password', async () => {
    const sut = makeSut();

    const spy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('password');

    expect(spy).toHaveBeenCalledWith('password', 12);
  });

  test('Should return hash on success', async () => {
    const sut = makeSut();
    const hash = await sut.encrypt('password');
    expect(hash).toBe('hash');
  });

  test('Should call with correct password and hash password', async () => {
    const sut = makeSut();
    const spy = jest.spyOn(bcrypt, 'compare');
    await sut.compare('password', 'hash');
    expect(spy).toHaveBeenCalledWith('password', 'hash');
  });
});
