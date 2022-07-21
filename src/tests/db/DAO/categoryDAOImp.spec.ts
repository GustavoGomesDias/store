/* eslint-disable dot-notation */
import CategoryDAOImp from '@DAOImp/CategoryDAOImp';
import categoryMock from '@mocks/categoryMock';
import ICategoryModel from '@models/ICategoryModel';

const makeDAOImp = (): CategoryDAOImp => new CategoryDAOImp();

describe('Category DAO Implementation tests', () => {
  const category: Omit<ICategoryModel, 'id'> = {
    name: 'Shirts',
  };

  test('Should call prisma create function with correct values', async () => {
    const dao = makeDAOImp();

    dao['entity'] = categoryMock.category;

    const spy = jest.spyOn(dao['entity'], 'create');

    await dao.add(category);

    expect(spy).toHaveBeenCalledWith({
      data: {
        ...category,
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

      data: category,
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
