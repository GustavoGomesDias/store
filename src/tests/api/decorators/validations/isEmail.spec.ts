/* eslint-disable no-useless-catch */
import { BadRequestErr } from '@err/BadRequestError';
import * as validations from '@validations/index';

describe('@validations - Validate emails', () => {
  class TestDTOStub {
    @validations.IsEmail()
    public property: string;

    constructor(property: string) {
      this.property = property;
    }
  }

  test('Should return bad request error if email is invalid', () => {
    const makeStub = () => {
      try {
        return new TestDTOStub('invalid_email2email.com');
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
        return new TestDTOStub('email@email.com');
      } catch (err) {
        throw err;
      }
    };

    const stub = makeStub();
    expect(stub.property).toEqual('email@email.com');
  });
});
