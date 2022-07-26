/* eslint-disable max-classes-per-file */
/* eslint-disable no-return-await */
import {
  Delete, Get, Post, Put, Route,
} from '@api/index';
import { IApiRouterDefinition } from '@global/IApi';
import { IRequest, IResponse } from '@http/index';

describe('@routes - Get router test', () => {
  class ApiGetStub {
    @Get('/')
    async getApiEndPointStub(req: IRequest): Promise<IResponse> {
      return await Promise.resolve({
        statusCode: 200,
        body: {
          message: 'success',
        },
      });
    }
  }

  class ApiPostStub {
    @Post('/')
    async postApiEndPointStub(req: IRequest): Promise<IResponse> {
      return await Promise.resolve({
        statusCode: 200,
        body: {
          message: 'success',
        },
      });
    }
  }

  class ApiPutStub {
    @Put('/')
    async putApiEndPointStub(req: IRequest): Promise<IResponse> {
      return await Promise.resolve({
        statusCode: 200,
        body: {
          message: 'success',
        },
      });
    }
  }

  class ApiDeleteStub {
    @Delete('/')
    async deleteApiEndPointStub(req: IRequest): Promise<IResponse> {
      return await Promise.resolve({
        statusCode: 200,
        body: {
          message: 'success',
        },
      });
    }
  }

  const makeStub = (type: 'get' | 'post' | 'put' | 'delete') => {
    switch (type) {
      case 'delete':
        return new ApiDeleteStub();
      case 'post':
        return new ApiPostStub();
      case 'put':
        return new ApiPutStub();
      default:
        return new ApiGetStub();
    }
  };

  afterAll(() => {
    Reflect.deleteMetadata('routes', ApiGetStub);
  });

  test('Should return api router definition list with get router for getApiEndPointStub', () => {
    makeStub('get');
    const routes = Reflect.getMetadata('routes', ApiGetStub) as Array<IApiRouterDefinition>;
    const index = routes.map((item) => item.controllerMethod).indexOf('getApiEndPointStub');

    expect(routes[index]).toEqual({
      method: 'get',
      path: '/',
      controllerMethod: 'getApiEndPointStub',
    });
  });

  test('Should return api router definition list with get router for postApiEndPointStub', () => {
    makeStub('post');
    const routes = Reflect.getMetadata('routes', ApiPostStub) as Array<IApiRouterDefinition>;
    const index = routes.map((item) => item.controllerMethod).indexOf('postApiEndPointStub');

    expect(routes[index]).toEqual({
      method: 'post',
      path: '/',
      controllerMethod: 'postApiEndPointStub',
    });
  });

  test('Should return api router definition list with get router for putApiEndPointStub', () => {
    makeStub('put');
    const routes = Reflect.getMetadata('routes', ApiPutStub) as Array<IApiRouterDefinition>;
    const index = routes.map((item) => item.controllerMethod).indexOf('putApiEndPointStub');

    expect(routes[index]).toEqual({
      method: 'put',
      path: '/',
      controllerMethod: 'putApiEndPointStub',
    });
  });

  test('Should return api router definition list with get router for deleteApiEndPointStub', () => {
    makeStub('delete');
    const routes = Reflect.getMetadata('routes', ApiDeleteStub) as Array<IApiRouterDefinition>;
    const index = routes.map((item) => item.controllerMethod).indexOf('deleteApiEndPointStub');

    expect(routes[index]).toEqual({
      method: 'delete',
      path: '/',
      controllerMethod: 'deleteApiEndPointStub',
    });
  });

  describe('@routes-controller - Router Prefix', () => {
    afterAll(() => {
      Reflect.deleteMetadata('routes', ApiGetStub);
    });

    @Route('/test')
    class ApiEndPointStub {}

    const makeApiEndPointStub = () => new ApiEndPointStub();

    test('Should return correct router prefix', () => {
      makeApiEndPointStub();

      const prefix = Reflect.getMetadata('prefix', ApiEndPointStub) as string;

      expect(prefix).toEqual('/test');
    });
  });
});
