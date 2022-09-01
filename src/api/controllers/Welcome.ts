import { Get, Route } from '@api/index';
import { IResponse } from '@http/IReponse';
import { IRequest } from '@http/IRequest';

@Route('/')
export default class Welcome {
  @Get('/')
  welcome(req: IRequest): IResponse {
    return {
      statusCode: 200,
      body: {
        message: 'Esta é a API de uma lojinha feita para minha mãe, aqui nesse endpoint você vai encontrar uma breve descrição dela.',
        content: {
          clothes: {
            path: '/clothes',
            methods: ['GET /:id', 'GET /page/:page', 'POST', 'PUT /', 'DELETE /:id'],
          },
          images: {
            path: '/upload',
            methods: ['GET /:id', 'POST /', 'PUT /', 'DELETE /:id'],
          },
        },
      },
    };
  }
}
