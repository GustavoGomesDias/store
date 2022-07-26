/* eslint-disable no-useless-catch */
import { BadRequestErr } from '@err/BadRequestError';
import * as validations from '@validaions/index';

describe('@validations - Minimum property size', () => {
  class TestDTOStub {
    @validations.Min(3, 'Property')
    public property: string;

    constructor(property: string) {
      this.property = property;
    }
  }

  test('Should return bad request error if property size is less than a defined value', () => {
    // const spy = jest.spyOn(validations, 'Min');

    // eslint-disable-next-line no-new
    const makeStub = () => {
      try {
        return new TestDTOStub('a');
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });

  test('Should not return bad request error if property size is greater than a defined value', () => {
    // const spy = jest.spyOn(validations, 'Min');

    // eslint-disable-next-line no-new
    const makeStub = () => {
      try {
        return new TestDTOStub('aaa');
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).not.toThrow(BadRequestErr);
  });

  test('Should return bad request error if property size is less than a defined value', () => {
    // const spy = jest.spyOn(validations, 'Min');

    // eslint-disable-next-line no-new
    const makeStub = () => {
      try {
        return new TestDTOStub('aaa');
      } catch (err) {
        throw err;
      }
    };

    const stub = makeStub();
    expect(stub.property).toEqual('aaa');
  });
});
