/* eslint-disable no-useless-catch */
import CategoryDTO from '@dtos/CategoryDTO';
import { BadRequestErr } from '@err/BadRequestError';

describe('Clothes DTO', () => {
  test('Should return bad request erro if name min size is less than 3', () => {
    const makeStub = () => {
      try {
        return new CategoryDTO('a');
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });

  test('Should category dto name field is equals a passed by constructor parameter', () => {
    const makeStub = () => {
      try {
        return new CategoryDTO('test');
      } catch (err) {
        throw err;
      }
    };

    const stub = makeStub();
    expect(stub.name).toBe('test');
  });
});
