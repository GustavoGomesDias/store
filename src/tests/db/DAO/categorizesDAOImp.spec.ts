import CategorizesDAOImp from '@DAOImp/CategorizesDAOImp';
import ICategorizesModel from '@models/ICategorizesModel';
import { Prisma } from '@prisma/client';

const makeDAOImp = (): CategorizesDAOImp => new CategorizesDAOImp();

describe('Category DAO Implementation tests', () => {
  const categorizes: Omit<ICategorizesModel, 'id'> = {
    categoryId: 1,
    clothesId: 1,
  };

  test('Should call prisma create function with correct values', async () => {
    const dao = makeDAOImp();

    // eslint-disable-next-line dot-notation
    const spy = jest.spyOn(dao['entity'], 'create').mockImplementationOnce(jest.fn());

    await dao.add(categorizes);

    expect(spy).toHaveBeenCalledWith({
      data: {
        ...categorizes,
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

    const data: Prisma.categorizesUpdateArgs = {
      where: {
        id: 1,
      },

      data: categorizes,
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

    await dao.delete(data);

    expect(spy).toHaveBeenCalledWith(data);
  });
});
