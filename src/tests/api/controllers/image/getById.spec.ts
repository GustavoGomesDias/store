import GenericDAOImp from '@db/DAO/generic/prisma/PrismaGenericDAOImp';
import prisma from '@db/infra/PrismaConnection';
import { Server } from 'http';
import request from 'supertest';
import dao from '@DAOImp/index';
import ImageModel from '@models/IImageModel';
import app from '../../../../app';

describe('Images Get By Id Route', () => {
  let server: Server;
  let supertest: request.SuperAgentTest;
  beforeAll(() => {
    server = app.listen(8515);
    supertest = request.agent(server);
  });

  afterAll(() => {
    if (server) {
      server.close();
    }
  });

  const mockedImage: Omit<ImageModel, 'id'> = {
    imageUrl: 'https://images.pexels.com/photos/8230825/pexels-photo-8230825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    clothesId: 1,
  };

  test('Should call DAO find by id function with correct id', async () => {
    jest.spyOn(GenericDAOImp.prototype, 'findById').mockImplementationOnce(async (id) => {
      const result = await Promise.resolve(mockedImage);

      return result;
    });

    await supertest.get('/upload/1')
      .expect('Content-Type', /json/);

    const spy = jest.spyOn(dao.ImageDAOImp.prototype, 'findById');

    expect(spy).toHaveBeenCalledWith(1);
  });

  test('Should call prisma find by id function with correct contract', async () => {
    const spy = jest.spyOn(prisma.images, 'findUnique').mockImplementationOnce(jest.fn());

    await supertest.get('/upload/1')
      .expect('Content-Type', /json/);

    expect(spy).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });

  test('Should return 400 if id is not a number', async () => {
    jest.spyOn(prisma.images, 'findUnique').mockImplementationOnce(jest.fn());

    const response = await supertest.get('/upload/aaa')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toEqual(400);
  });

  test('Should return 400 if id is not exists', async () => {
    jest.spyOn(prisma.images, 'findUnique').mockImplementationOnce(jest.fn());

    const response = await supertest.get('/upload/{}')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toEqual(400);
  });
});