/* eslint-disable no-useless-catch */
import ClothesDTO from '@dtos/ClotesDTO';
import { BadRequestErr } from '@err/BadRequestError';

describe('Clothes DTO', () => {
  test('Should return bad request erro if name min size is less than 8', () => {
    const makeStub = () => {
      try {
        return new ClothesDTO('a', 1, 1, ['https://images.com']);
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });

  test('Should return bad request erro if value is less than 0', () => {
    const makeStub = () => {
      try {
        return new ClothesDTO('aaaaaaaa', -1, 1, ['https://images.com']);
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });

  test('Should return bad request erro if quantity is less than 0', () => {
    const makeStub = () => {
      try {
        return new ClothesDTO('aaaaaaaa', 1, -1, ['https://images.com']);
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });

  test('Should return bad request erro if images list is empty', () => {
    const makeStub = () => {
      try {
        return new ClothesDTO('aaaaaaaa', 1, -1, []);
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });
});
