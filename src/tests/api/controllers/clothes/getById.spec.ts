import GenericDAOImp from '@db/DAO/generic/prisma/PrismaGenericDAOImp';
import prisma from '@db/infra/PrismaConnection';
import { Server } from 'http';
import request from 'supertest';
import dao from '@DAOImp/index';
import ClothesModel from '@models/IClothesModel';
import app from '../../../../app';

describe('Clothes Get By Id Route', () => {
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

  const mockedClothes: Omit<ClothesModel, 'id'> = {
    name: 'blue shirt',
    quantity: 3,
    value: 14.99,
  };

  test('Should call DAO find by id function with correct id', async () => {
    jest.spyOn(GenericDAOImp.prototype, 'findById').mockImplementationOnce(async (id) => {
      const result = await Promise.resolve(mockedClothes);

      return result;
    });

    await supertest.get('/clothes/1')
      .expect('Content-Type', /json/);

    const spy = jest.spyOn(dao.ClothesDAOImp.prototype, 'findById');

    expect(spy).toHaveBeenCalledWith(1);
  });

  test('Should call prisma find by id function with correct contract', async () => {
    const spy = jest.spyOn(prisma.clothes, 'findUnique').mockImplementationOnce(jest.fn());

    await supertest.get('/clothes/1')
      .expect('Content-Type', /json/);

    expect(spy).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });

  test('Should return 400 if id is not a number', async () => {
    jest.spyOn(prisma.clothes, 'findUnique').mockImplementationOnce(jest.fn());

    const response = await supertest.get('/clothes/aaa')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toEqual(400);
  });

  test('Should return 400 if id is not exists', async () => {
    jest.spyOn(prisma.clothes, 'findUnique').mockImplementationOnce(jest.fn());

    const response = await supertest.get('/clothes/{}')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toEqual(400);
  });
});
