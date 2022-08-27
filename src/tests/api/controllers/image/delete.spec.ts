import dao from '@DAOImp/index';
import GenericDAOImp from '@db/DAO/generic/prisma/PrismaGenericDAOImp';
import prisma from '@db/infra/PrismaConnection';
import Auth from '@middlewares/Auth';
import { Server } from 'http';
import request from 'supertest';
import app from '../../../../app';

describe('Image delete route', () => {
  let server: Server;
  let supertest: request.SuperAgentTest;

  beforeAll(() => {
    server = app.listen();
    supertest = request.agent(server);
  });

  afterAll((done) => {
    if (server) {
      server.close(done);
    }
  });

  test('Should call DAO delete function with correct id', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());

    jest.spyOn(GenericDAOImp.prototype, 'delete').mockImplementationOnce((id) => id);

    await supertest.delete('/upload/1')
      .expect('Content-Type', /json/);

    const spy = jest.spyOn(dao.ImageDAOImp.prototype, 'delete');

    expect(spy).toHaveBeenCalledWith(1);
  });

  test('Should call prisma delete function with correct contract', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());

    const spy = jest.spyOn(prisma.images, 'delete').mockImplementationOnce(jest.fn());

    await supertest.delete('/upload/1')
      .expect('Content-Type', /json/);

    expect(spy).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });

  test('Should return 400 if id is not a number', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());

    jest.spyOn(prisma.images, 'delete').mockImplementationOnce(jest.fn());

    const response = await supertest.delete('/upload/aaa')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toEqual(400);
  });

  test('Should return 400 if id is not exists', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());

    jest.spyOn(prisma.images, 'delete').mockImplementationOnce(jest.fn());

    const response = await supertest.delete('/upload/{}')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toEqual(400);
  });

  test('Should return 200 if image is deleted', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());

    jest.spyOn(prisma.images, 'delete').mockImplementationOnce(jest.fn());

    const response = await supertest.delete('/upload/1')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toEqual(200);
  });
});
