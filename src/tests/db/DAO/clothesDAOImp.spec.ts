import ClothesDAOImp from '@DAOImp/clothes/ClothesDAOImp';
import IClothesModel from '@models/IClothesModel';

const makeDAOImp = (): ClothesDAOImp => new ClothesDAOImp();

describe('Clothes DAO Implementation tests', () => {
  const clothes: Omit<IClothesModel, 'id'> = {
    name: 'Blue shirt',
    quantity: 2,
    value: 15.99,
    images: ['https://images.com'],
  };

  test('Should call prisma create function with correct values', async () => {
    const dao = makeDAOImp();

    // eslint-disable-next-line dot-notation
    const spy = jest.spyOn(dao['entity'], 'create').mockImplementationOnce(jest.fn());

    const { images, ...rest } = clothes;
    await dao.addClothes({
      ...clothes,
    });

    expect(spy).toHaveBeenCalledWith({
      data: {
        ...rest,
        images: {
          set: images,
        },
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

      data: clothes,
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
