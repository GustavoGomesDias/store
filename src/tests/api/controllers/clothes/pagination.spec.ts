import GenericDAOImp from '@db/DAO/generic/prisma/PrismaGenericDAOImp';
import prisma from '@db/infra/PrismaConnection';
import { Server } from 'http';
import request from 'supertest';
import dao from '@DAOImp/index';
import ClothesModel from '@models/IClothesModel';
import app from '../../../../app';

describe('Clothes Pagination Route', () => {
  let server: Server;
  let supertest: request.SuperAgentTest;
  beforeAll(() => {
    server = app.listen(8781);
    supertest = request.agent(server);
  });

  afterAll(() => {
    if (server) {
      server.close();
    }
  });

  const mockedClothes: Omit<ClothesModel, 'id'> = {
    name: 'blue shirt',
    quantity: 3,
    value: 14.99,
    images: ['https://picsum.photos/seed/picsum/200/300'],
  };

  test('Should call DAO pagination function with correct id', async () => {
    jest.spyOn(GenericDAOImp.prototype, 'pagination').mockImplementationOnce(async (page) => {
      const result = await Promise.resolve(mockedClothes);

      return result;
    });

    await supertest.get('/clothes/page/1')
      .expect('Content-Type', /json/);

    const spy = jest.spyOn(dao.ClothesDAOImp.prototype, 'pagination');

    expect(spy).toHaveBeenCalledWith(1);
  });

  test('Should call prisma find many function with correct contract', async () => {
    const spy = jest.spyOn(prisma.clothes, 'findMany').mockImplementationOnce(jest.fn());

    await supertest.get('/clothes/page/1')
      .expect('Content-Type', /json/);

    expect(spy).toHaveBeenCalledWith({
      take: 6,
      skip: (6 * 1),
    });
  });

  test('Should return 400 if page is not a number', async () => {
    jest.spyOn(prisma.clothes, 'findUnique').mockImplementationOnce(jest.fn());

    const response = await supertest.get('/clothes/page/aaa')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toEqual(400);
  });
});