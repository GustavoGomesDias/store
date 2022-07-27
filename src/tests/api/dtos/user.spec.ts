/* eslint-disable no-useless-catch */
import UserDTO from '@dtos/UserDTO';
import { BadRequestErr } from '@err/BadRequestError';

describe('Clothes DTO', () => {
  test('Should return bad request erro if name is empty', () => {
    const makeStub = () => {
      try {
        return new UserDTO('', 'email@email.com', 'password');
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });

  test('Should return bad request erro if password min size is less than 6', () => {
    const makeStub = () => {
      try {
        return new UserDTO('name', 'email@email.com', '123');
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });

  test('Should return bad request erro if email is invalid', () => {
    const makeStub = () => {
      try {
        return new UserDTO('name', 'email2email.com', '123');
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });
});
