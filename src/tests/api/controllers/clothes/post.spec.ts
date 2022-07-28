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

  test('Should return 400 if name is empty', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    const { name, ...rest } = mockedClothes;
    const response = await supertest.post('/clothes')
      .expect('Content-Type', /json/)
      .send({
        ...rest,
        name: '',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.body.error).toEqual('O tamanho de Nome da roupa precisa ser maior que 8.');
  });

  test('Should return 400 if values is less than zero.', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    const { value, ...rest } = mockedClothes;
    const response = await supertest.post('/clothes')
      .expect('Content-Type', /json/)
      .send({
        ...rest,
        value: -1,
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.body.error).toEqual('Valor da roupa precisa ser maior que 0.');
  });

  test('Should return 400 if values is not a number.', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    const { value, ...rest } = mockedClothes;
    const response = await supertest.post('/clothes')
      .expect('Content-Type', /json/)
      .send({
        ...rest,
        value: 'aaaa',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.body.error).toEqual('Valor da roupa precisa ser um número e maior que 0.');
  });

  test('Should return 400 if quantity is less than zero.', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    const { quantity, ...rest } = mockedClothes;
    const response = await supertest.post('/clothes')
      .expect('Content-Type', /json/)
      .send({
        ...rest,
        quantity: -1,
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.body.error).toEqual('Quantidade das roupas precisa ser maior que 0.');
  });

  test('Should return 400 if quantity is not a number.', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    const { quantity, ...rest } = mockedClothes;
    const response = await supertest.post('/clothes')
      .expect('Content-Type', /json/)
      .send({
        ...rest,
        quantity: 'aaaa',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.body.error).toEqual('Quantidade das roupas precisa ser um número e maior que 0.');
  });

  test('Should return 400 if not have image.', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    const { images, ...rest } = mockedClothes;
    const response = await supertest.post('/clothes')
      .expect('Content-Type', /json/)
      .send({
        ...rest,
        images: [],
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.body.error).toEqual('É preciso pelo menos um (a) imagem.');
  });

  test('Should return 400 if not have image.', async () => {
    prismaMock.clothes.create.mockImplementationOnce(jest.fn());
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    const response = await supertest.post('/clothes')
      .expect('Content-Type', /json/)
      .send(mockedClothes);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      body: {
        message: 'Roupa criada com sucesso!',
      },
    });
  });
});