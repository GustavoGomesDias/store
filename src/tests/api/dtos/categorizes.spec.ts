/* eslint-disable no-useless-catch */
import CategorizesDTO from '@dtos/CategorizesDTO';
import { BadRequestErr } from '@err/BadRequestError';

describe('Clothes DTO', () => {
  test('Should return bad request erro if category id is invalid', () => {
    const makeStub = () => {
      try {
        return new CategorizesDTO(1, -1);
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });

  test('Should return bad request erro if clothes id is invalid', () => {
    const makeStub = () => {
      try {
        return new CategorizesDTO(-1, 1);
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });
});
