/* eslint-disable dot-notation */
import CategorizesDAOImp from '@DAOImp/CategorizesDAOImp';
import categorizesMock from '@mocks/categorizesMock';
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
    dao['entity'] = categorizesMock.categorizes;

    // eslint-disable-next-line dot-notation
    const spy = jest.spyOn(dao['entity'], 'create');

    await dao.add(categorizes);

    expect(spy).toHaveBeenCalledWith({
      data: {
        ...categorizes,
      },
    });
  });

  test('Should call prisma findUnique function with correct values', async () => {
    const dao = makeDAOImp();

    dao['entity'] = categorizesMock.categorizes;

    const spy = jest.spyOn(dao['entity'], 'findUnique');

    await dao.findById(1);

    expect(spy).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });

  test('Should call prisma update function with correct values', async () => {
    const dao = makeDAOImp();
    dao['entity'] = categorizesMock.categorizes;
    const spy = jest.spyOn(dao['entity'], 'update');

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

    dao['entity'] = categorizesMock.categorizes;

    const spy = jest.spyOn(dao['entity'], 'delete');

    const data = {
      where: {
        id: 1,
      },
    };

    await dao.delete(data);

    expect(spy).toHaveBeenCalledWith(data);
  });
});
