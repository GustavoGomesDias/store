/* eslint-disable no-return-await */
/* eslint-disable no-useless-catch */
import { BadRequestErr } from '@err/BadRequestError';
import { IRequest } from '@http/IRequest';
import * as validations from '@validaions/index';

describe('@validations - Testing request params', () => {
  class TestRequestStub {
    @validations.IsValidNumberParams('property')
    async testFunction(req: IRequest<unknown>) {
      return await Promise.resolve({
        statusCode: 200,
        body: {
          message: 'success',
        },
      });
    }
  }

  test('Should return bad request error if params is not an object', async () => {
    const stub = new TestRequestStub();

    await expect(stub.testFunction({
      params: 'aaaa',
    })).rejects.toThrow(BadRequestErr);
  });

  test('Should return bad request error if params is an empty object', async () => {
    const stub = new TestRequestStub();

    await expect(stub.testFunction({
      params: {},
    })).rejects.toThrow(BadRequestErr);
  });

  test('Should return bad request error if params have an undefined property', async () => {
    const stub = new TestRequestStub();

    await expect(stub.testFunction({
      params: {
        property: undefined,
      },
    })).rejects.toThrow(BadRequestErr);
  });

  test('Should return bad request error if params have an empty property', async () => {
    const stub = new TestRequestStub();

    await expect(stub.testFunction({
      params: {
        property: '',
      },
    })).rejects.toThrow(BadRequestErr);
  });

  test('Should return bad request error if param is less than 0', async () => {
    const stub = new TestRequestStub();

    await expect(stub.testFunction({
      params: {
        property: -1,
      },
    })).rejects.toThrow(BadRequestErr);
  });

  test('Should return a function if params exists', async () => {
    const stub = new TestRequestStub();

    await expect(stub.testFunction({
      params: {
        property: 1,
      },
    })).resolves.toEqual({
      statusCode: 200,
      body: {
        message: 'success',
      },
    });
  });
});
