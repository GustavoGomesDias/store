/* eslint-disable dot-notation */
import ImageDAOImp from '@DAOImp/image/ImageDAOImp';
import { AddImages } from '@db/usecases/images';
import imageMock from '@mocks/DAO/imageMock';

const makeDAOImp = (): ImageDAOImp => new ImageDAOImp();

describe('Category DAO Implementation tests', () => {
  const image: AddImages = {
    clothesId: 1,
    imageUrl: 'https://www.google.com',
  };

  test('Should call prisma create function with correct values', async () => {
    const dao = makeDAOImp();

    dao['entity'] = imageMock.images;

    const spy = jest.spyOn(dao['entity'], 'create');

    await dao.add(image);

    expect(spy).toHaveBeenCalledWith({
      data: {
        ...image,
      },
    });
  });

  test('Should call prisma findUnique function with correct values', async () => {
    const dao = makeDAOImp();

    // eslint-disable-next-line dot-notation
    const spy = jest.spyOn(dao['entity'], 'findUnique').mockImplementationOnce(jest.fn());

    await dao.findById(1);

    expect(spy).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });

  test('Should call prisma update function with correct values', async () => {
    const dao = makeDAOImp();

    // eslint-disable-next-line dot-notation
    const spy = jest.spyOn(dao['entity'], 'update').mockImplementationOnce(jest.fn());

    const data = {
      where: {
        id: 1,
      },

      data: image,
    };

    await dao.update(data);

    expect(spy).toHaveBeenCalledWith(data);
  });

  test('Should call prisma delete function with correct values', async () => {
    const dao = makeDAOImp();

    // eslint-disable-next-line dot-notation
    const spy = jest.spyOn(dao['entity'], 'delete').mockImplementationOnce(jest.fn());

    const data = {
      where: {
        id: 1,
      },
    };

    await dao.delete(1);

    expect(spy).toHaveBeenCalledWith(data);
  });
});
