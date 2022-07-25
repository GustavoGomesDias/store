import WebToken from '@adapters/services/WebToken';
import IUserModel from '@db/models/IUserModel';

export const makeWebTokenStub = (): WebToken => {
  class WebTokenStub implements WebToken {
    sign(payload: Omit<IUserModel, 'password'>, expiresIn: string | number): string {
      return 'payload';
    }

    verify(token: string): Omit<IUserModel, 'password'> {
      return {
        id: 1,
        email: 'email@email.com',
        name: 'Test',
      };
    }
  }

  return new WebTokenStub();
};
