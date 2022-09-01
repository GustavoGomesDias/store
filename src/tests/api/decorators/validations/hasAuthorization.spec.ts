/* eslint-disable no-return-await */
import { UnauthorizedError } from '@err/UnauthorizedError';
import { IResponse } from '@http/IReponse';
import { IRequest } from '@http/IRequest';
import HasAuthorization from '@validations/HasAuthorization';

describe('@validations - Authorization tests', () => {
  class ApiEndPointStub {
    @HasAuthorization()
    async get(req: IRequest): Promise<IResponse> {
      return await Promise.resolve({
        statusCode: 200,
        body: {
          message: 'success',
        },
      });
    }
  }

  const makeStub = () => new ApiEndPointStub();

  test('Should unauthorization error if headers is undefined', async () => {
    const stub = makeStub();
    await expect(stub.get({})).rejects.toThrow(UnauthorizedError);
  });

  test('Should unauthorization error if authorization token is undefined', async () => {
    const stub = makeStub();
    await expect(stub.get({
      headers: {},
    })).rejects.toThrow(UnauthorizedError);
  });

  test('Should unauthorization error if authorization token is of an invalid type', async () => {
    const stub = makeStub();
    await expect(stub.get({
      headers: {
        authorization: 'ahdhaduhauihdahsud',
      },
    })).rejects.toThrow(UnauthorizedError);
  });

  test('Should return IResponse data if is authorization header is correct', async () => {
    const stub = makeStub();
    await expect(stub.get({
      headers: {
        authorization: 'Bearer auhsuiahduashdadndjk',
      },
    })).resolves.toEqual({
      statusCode: 200,
      body: {
        message: 'success',
      },
    });
  });
});
