/* eslint-disable dot-notation */
import ClothesModel from '@db/models/IClothesModel';
import Container from '@DI/Container';
import Auth from '@middlewares/Auth';
import prismaMock from '@mocks/DAO/prismaMock';
import { Server } from 'http';
import request from 'supertest';
import app from '../../../../app';

describe('Clothes Post Route', () => {
  let server: Server;
  let supertest: request.SuperAgentTest;
  beforeAll(async () => {
    server = app.listen(4001);

    supertest = request.agent(server);
  });

  afterAll(async () => {
    if (server) {
      Container['injectionRecord'].clear();
      server.close();
    }
  });

  const mockedClothes: Omit<ClothesModel, 'id'> = {
    name: 'blue shirt',
    quantity: 3,
    value: 14.99,
    images: ['https://picsum.photos/seed/picsum/200/300'],
  };

  test('Should return an error for empty body', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    prismaMock.clothes.update.mockImplementationOnce(jest.fn());
    const response = await supertest.put('/clothes')
      .expect('Content-Type', /json/)
      .send({});

    expect(response.statusCode).toEqual(400);
  });

  test('Should return an error if property body is empty', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    prismaMock.clothes.update.mockImplementationOnce(jest.fn());
    const response = await supertest.put('/clothes')
      .expect('Content-Type', /json/)
      .send({
        name: '',
      });

    expect(response.statusCode).toEqual(400);
  });

  test('Should return an error if property body is empty array', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    prismaMock.clothes.update.mockImplementationOnce(jest.fn());
    const response = await supertest.put('/clothes')
      .expect('Content-Type', /json/)
      .send({
        value: 1,
        name: [],
      });

    expect(response.statusCode).toEqual(400);
  });

  test('Should return an error if property body is empty object', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    prismaMock.clothes.update.mockImplementationOnce(jest.fn());
    const response = await supertest.put('/clothes')
      .expect('Content-Type', /json/)
      .send({
        name: {},
      });

    expect(response.statusCode).toEqual(400);
  });

  test('Should not return an error for partial clothes infos', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    prismaMock.clothes.update.mockImplementationOnce(jest.fn());
    const response = await supertest.put('/clothes')
      .expect('Content-Type', /json/)
      .send({
        name: mockedClothes.name,
      });

    expect(response.statusCode).toEqual(200);
  });
});
