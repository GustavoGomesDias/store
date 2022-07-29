import jwt from 'jsonwebtoken';
import WebTokenService from '@services/WebTokenService';
import WebToken from '@adapters/services/WebToken';
import { UnauthorizedError } from '@err/UnauthorizedError';

jest.mock('jsonwebtoken', () => ({
  sign(payload: string | object | Buffer, secretOrPrivateKey: jwt.Secret, options?: jwt.SignOptions | undefined): string {
    return 'token';
  },

  verify(token: string, secretOrPublicKey: jwt.Secret | jwt.GetPublicKeyOrSecret, callback?: jwt.VerifyCallback<string | jwt.JwtPayload> | undefined): unknown {
    return {
      id: 1,
      email: 'email@email.com',
      name: 'Test',
    };
  },

}));

const makeSut = (): WebToken => new WebTokenService();

describe('JWT Service', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('Should call with correct password', () => {
    process.env.JWT_SECRET = 'shhhh';
    const sut = makeSut();

    const spy = jest.spyOn(jwt, 'sign');
    sut.sign({
      id: 1,
      email: 'email@email.com',
      name: 'Test',
    }, '1d');

    expect(spy).toHaveBeenCalledWith({
      id: 1,
      email: 'email@email.com',
      name: 'Test',
    }, 'shhhh', { expiresIn: '1d' });
  });

  test('Should call with correct password and hash password', async () => {
    process.env.JWT_SECRET = 'shhhh';
    const sut = makeSut();
    const spy = jest.spyOn(jwt, 'verify');
    sut.verify('token');
    expect(spy).toHaveBeenCalledWith('token', 'shhhh', expect.any(Function));
  });

  // Ask Nathan at 19 hours
  // test('Should call with correct password and hash password', async () => {
  //   process.env.JWT_SECRET = 'shhhh';
  //   const sut = makeSut();
  //   const spy = jest.spyOn(jwt, 'verify').mockImplementationOnce((token: string, secretOrPublicKey: jwt.Secret | jwt.GetPublicKeyOrSecret, options?: jwt.VerifyOptions, callback?: jwt.VerifyCallback<string | jwt.JwtPayload> | undefined) => {
  //     callback?.(new jwt.TokenExpiredError('', new Date(1)), '');
  //   });
  //   sut.verify('token');
  //   expect(spy).toThrow(new UnauthorizedError('Token expirado.'));
  // });
});
