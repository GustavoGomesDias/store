/* eslint-disable no-useless-catch */
import ImageDTO from '@dtos/ImageDTO';
import { BadRequestErr } from '@err/BadRequestError';

describe('Clothes DTO', () => {
  test('Should return bad request erro if url is invalid', () => {
    const makeStub = () => {
      try {
        return new ImageDTO('ttps://www.google.com', 1);
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });

  test('Should return bad request erro if clothesId is less than 0', () => {
    const makeStub = () => {
      try {
        return new ImageDTO('ttps://www.google.com', -1);
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });
});
