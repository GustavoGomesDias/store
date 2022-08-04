/* eslint-disable dot-notation */
import Auth from '@middlewares/Auth';
import userMock from '@mocks/DAO/userMock';
import factory from '@mocks/DI/factory';
import { makeWebTokenStub } from '@mocks/services/webToken';

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
});
