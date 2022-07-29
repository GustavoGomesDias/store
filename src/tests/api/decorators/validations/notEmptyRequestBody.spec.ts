/* eslint-disable no-return-await */
/* eslint-disable no-useless-catch */
import { BadRequestErr } from '@err/BadRequestError';
import { IRequest } from '@http/IRequest';
import * as validations from '@validaions/index';

describe('@validations - Testing request body', () => {
  class TestRequestStub {
    @validations.NotEmptyRequestBody()
    async testFunction(req: IRequest<unknown>) {
      return await Promise.resolve({
        statusCode: 200,
        body: {
          message: 'success',
        },
      });
    }
  }

  test('Should return bad request error if body is not an object', async () => {
    const stub = new TestRequestStub();

    await expect(stub.testFunction({
      body: 'aaaa',
    })).rejects.toThrow(BadRequestErr);
  });

  test('Should return bad request error if body is an empty object', async () => {
    const stub = new TestRequestStub();

    await expect(stub.testFunction({
      body: {},
    })).rejects.toThrow(BadRequestErr);
  });

  test('Should return bad request error if body have an undefined property', async () => {
    const stub = new TestRequestStub();

    await expect(stub.testFunction({
      body: {
        test: undefined,
      },
    })).rejects.toThrow(BadRequestErr);
  });

  test('Should return bad request error if body have an empty property', async () => {
    const stub = new TestRequestStub();

    await expect(stub.testFunction({
      body: {
        test: '',
      },
    })).rejects.toThrow(BadRequestErr);
  });

  test('Should return bad request error if body have object property and this is empty', async () => {
    const stub = new TestRequestStub();

    await expect(stub.testFunction({
      body: {
        test: {},
      },
    })).rejects.toThrow(BadRequestErr);
  });

  test('Should return bad request error if body have array property and this is empty', async () => {
    const stub = new TestRequestStub();

    await expect(stub.testFunction({
      body: {
        test: [],
      },
    })).rejects.toThrow(BadRequestErr);
  });

  test('Should return a function if body exists', async () => {
    const stub = new TestRequestStub();

    await expect(stub.testFunction({
      body: {
        test: 'test',
      },
    })).resolves.toEqual({
      statusCode: 200,
      body: {
        message: 'success',
      },
    });
  });
});
