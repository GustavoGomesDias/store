/* eslint-disable no-useless-catch */
import { BadRequestErr } from '@err/BadRequestError';
import * as validations from '@validations/index';

describe('@validations - Validate emails', () => {
  class TestDTOStub {
    @validations.IsUrl()
    public property: string;

    constructor(property: string) {
      this.property = property;
    }
  }

  test('Should return bad request error if url is invalid', () => {
    const makeStub = () => {
      try {
        return new TestDTOStub('h\\p://www.google.com');
      } catch (err) {
        throw err;
      }
    };

    expect(makeStub).toThrow(BadRequestErr);
  });

  test('Should class property value is equals value passed by constructor', () => {
    // const spy = jest.spyOn(validations, 'Min');

    // eslint-disable-next-line no-new
    const makeStub = () => {
      try {
        return new TestDTOStub('https://www.google.com');
      } catch (err) {
        throw err;
      }
    };

    const stub = makeStub();
    expect(stub.property).toEqual('https://www.google.com');
  });
});
