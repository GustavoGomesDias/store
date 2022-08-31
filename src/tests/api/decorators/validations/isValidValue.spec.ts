/* eslint-disable no-useless-catch */
import { BadRequestErr } from '@err/BadRequestError';
import * as validations from '@validations/index';

describe('@validations - Validate value', () => {
  class TestDTOStub {
    @validations.IsValidValue('Property')
    public property: number;

    constructor(property: number) {
      this.property = property;
    }
  }

  test('Should return bad request error if property size is less than 0', () => {
    // const spy = jest.spyOn(validations, 'Min');

    // eslint-disable-next-line no-new
    const makeStub = () => {
      try {
        return new TestDTOStub(-1);
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });

  test('Should return bad request error if property is not a number', () => {
    // const spy = jest.spyOn(validations, 'Min');

    // eslint-disable-next-line no-new
    const makeStub = () => {
      try {
        return new TestDTOStub('aaa' as unknown as number);
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });

  test('Should not return bad request error if property size is greater than 0', () => {
    // const spy = jest.spyOn(validations, 'Min');

    // eslint-disable-next-line no-new
    const makeStub = () => {
      try {
        return new TestDTOStub(1);
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).not.toThrow(BadRequestErr);
  });

  test('Should class property value is equals value passed by constructor', () => {
    // const spy = jest.spyOn(validations, 'Min');

    // eslint-disable-next-line no-new
    const makeStub = () => {
      try {
        return new TestDTOStub(1);
      } catch (err) {
        throw err;
      }
    };

    const stub = makeStub();
    expect(stub.property).toEqual(1);
  });
});
