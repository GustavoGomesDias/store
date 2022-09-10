/* eslint-disable dot-notation */
import { AddImages } from '@db/usecases/images';
import Auth from '@middlewares/Auth';
import prismaMock from '@mocks/DAO/prismaMock';
import request from 'supertest';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import app from '../../../../app';

describe('Images Post Route', () => {
  const mockedImage: AddImages = {
    clothesId: 1,
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=',
  };

  test('Should return 400 if image is empty', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    const { image, ...rest } = mockedImage;
    const response = await request(app).post('/upload')
      .expect('Content-Type', /json/)
      .send({
        ...rest,
        image: '',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.body.error).toEqual('Esta não é uma imagem válida.');
  });

  test('Should return 400 if clothesId is less than zero.', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    const { clothesId, ...rest } = mockedImage;
    const response = await request(app).post('/upload')
      .expect('Content-Type', /json/)
      .send({
        ...rest,
        clothesId: -1,
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.body.error).toEqual('Id da roupa precisa ser maior que 0.');
  });

  test('Should return 400 if clothesId is not a number.', async () => {
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    const { clothesId, ...rest } = mockedImage;
    const response = await request(app).post('/upload')
      .expect('Content-Type', /json/)
      .send({
        ...rest,
        clothesId: 'aaaa',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.body.error).toEqual('Id da roupa precisa ser um número e maior que 0.');
  });

  test('Should return 200 if is created clothes.', async () => {
    prismaMock.images.create.mockImplementationOnce(jest.fn());
    jest.spyOn(cloudinary.uploader, 'upload').mockImplementationOnce(async (filepath: string) => {
      const result = await Promise.resolve('https://www.google.com');

      return {
        url: result,
      } as UploadApiResponse;
    });
    jest.spyOn(Auth.prototype, 'authentitcated').mockImplementationOnce(jest.fn());
    const response = await request(app).post('/upload')
      .expect('Content-Type', /json/)
      .send(mockedImage);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      body: {
        message: 'Imagem adicionada com sucesso!',
      },
    });
  });
});
