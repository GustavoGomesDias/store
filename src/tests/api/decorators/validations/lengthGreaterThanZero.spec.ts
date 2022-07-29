/* eslint-disable no-useless-catch */
import { BadRequestErr } from '@err/BadRequestError';
import * as validations from '@validaions/index';

describe('@validations - Validate value', () => {
  class TestDTOStub {
    @validations.LengthGreaterThanZero('Property')
    public property: string[];

    constructor(property: string[]) {
      this.property = property;
    }
  }

  test('Should return bad request error if property list size is less than 0', () => {
    // const spy = jest.spyOn(validations, 'Min');

    // eslint-disable-next-line no-new
    const makeStub = () => {
      try {
        return new TestDTOStub([]);
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });

  test('Should not return bad request error if property list size is greater than 0', () => {
    // const spy = jest.spyOn(validations, 'Min');

    // eslint-disable-next-line no-new
    const makeStub = () => {
      try {
        return new TestDTOStub(['aaaaa']);
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
        return new TestDTOStub(['aaaaa']);
      } catch (err) {
        throw err;
      }
    };

    const stub = makeStub();
    expect(stub.property).toEqual(['aaaaa']);
  });
});
