/* eslint-disable dot-notation */
import request from 'supertest';
import Auth from '@middlewares/Auth';
import userMock from '@mocks/DAO/userMock';
import factory from '@mocks/DI/factory';
import { makeWebTokenStub } from '@mocks/services/webToken';
import { UnauthorizedError } from '@err/UnauthorizedError';
import UserDAOImp from '@db/DAO/imp/user/UserDAOImp';

describe('Middleware - Auth', () => {
  beforeAll(() => jest.clearAllMocks());

  test('Should Auth Middleware contains webToken', () => {
    factory();

    const auth = new Auth();

    expect(auth['authTokenService']).toEqual(makeWebTokenStub());
  });

  test('Should Auth Middleware contains UserDAO', () => {
    factory();

    const auth = new Auth();

    expect(auth['userDAO']).toEqual(userMock);
  });

  test('Should throw UnauthorizedError if not exists header', async () => {
    const auth = new Auth();

    await expect(auth.authentitcated({})).rejects.toThrow(UnauthorizedError);
  });

  test('Should throw UnauthorizedError if not exists authorization', async () => {
    const auth = new Auth();

    await expect(auth.authentitcated({
      headers: {},
    })).rejects.toThrow(UnauthorizedError);
  });

  test('Should throw UnauthorizedError if not is Bearer token', async () => {
    const auth = new Auth();

    await expect(auth.authentitcated({
      headers: {
        authorization: 'ahdahdahsuh',
      },
    })).rejects.toThrow(UnauthorizedError);
  });

  test('Should throw UnauthorizedError if user is undefined', async () => {
    factory();
    const auth = new Auth();

    jest.spyOn(userMock, 'findById').mockImplementationOnce(async (id) => {
      const result = await Promise.resolve(undefined);

      return result;
    });

    await expect(auth.authentitcated({
      headers: {
        authorization: 'Bearer ahdahdahsuh',
      },
    })).rejects.toThrow(UnauthorizedError);
  });
});
