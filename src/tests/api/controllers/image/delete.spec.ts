import dao from '@DAOImp/index';
import GenericDAOImp from '@db/DAO/generic/prisma/PrismaGenericDAOImp';
import prisma from '@db/infra/PrismaConnection';
import Auth from '@middlewares/Auth';
import request from 'supertest';
import app from '../../../../app';

describe('Image delete route', () => {
  test('Should call DAO delete function with correct id', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());

    jest.spyOn(GenericDAOImp.prototype, 'delete').mockImplementationOnce((id) => id);

    await request(app).delete('/upload/1')
      .expect('Content-Type', /json/);

    const spy = jest.spyOn(dao.ImageDAOImp.prototype, 'delete');

    expect(spy).toHaveBeenCalledWith(1);
  });

  test('Should call prisma delete function with correct contract', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());

    const spy = jest.spyOn(prisma.images, 'delete').mockImplementationOnce(jest.fn());

    await request(app).delete('/upload/1')
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

    const response = await request(app).delete('/upload/aaa')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toEqual(400);
  });

  test('Should return 400 if id is not exists', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());

    jest.spyOn(prisma.images, 'delete').mockImplementationOnce(jest.fn());

    const response = await request(app).delete('/upload/{}')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toEqual(400);
  });

  test('Should return 200 if image is deleted', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());

    jest.spyOn(prisma.images, 'delete').mockImplementationOnce(jest.fn());

    const response = await request(app).delete('/upload/1')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toEqual(200);
  });
});
