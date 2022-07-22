/* eslint-disable dot-notation */
import UserDAOImp from '@DAOImp/user/UserDAOImp';
import prismaMock from '@mocks/DAO/prismaMock';
import IUserModel from '@models/IUserModel';
import * as factory from '@mocks/DI/factory';
import { DependencyError } from '@err/DependencyError';

const makeDAOImp = (): UserDAOImp => new UserDAOImp();

factory.default();

describe('User DAO Implementation tests', () => {
  const user: Omit<IUserModel, 'id'> = {
    name: 'Test',
    email: 'email@email.com',
    password: 'password',
  };

  const date = new Date(Date.now());

  test('Should call prisma create function with correct values', async () => {
    const dao = makeDAOImp();
    // eslint-disable-next-line dot-notation
    dao['entity'] = prismaMock.user;
    prismaMock.user.create.mockImplementationOnce(jest.fn());

    // eslint-disable-next-line dot-notation
    const spy = jest.spyOn(dao['entity'], 'create');

    await dao.addUser(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    expect(spy).toHaveBeenCalledWith({
      data: {
        ...rest,
        password: 'hash',
      },
    });
  });

  test('Should call prisma findUnique function with correct values', async () => {
    const dao = makeDAOImp();
    dao['entity'] = prismaMock.user;
    prismaMock.user.findUnique.mockImplementationOnce(jest.fn());

    // eslint-disable-next-line dot-notation
    const spy = jest.spyOn(dao['entity'], 'findUnique');

    await dao.findById(1);

    expect(spy).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });

  test('Should call prisma findUnique function with correct values', async () => {
    const dao = makeDAOImp();
    dao['entity'] = prismaMock.user;
    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: 1,
      ...user,
      createdAt: date,
      updatedAt: date,
    });

    // eslint-disable-next-line dot-notation
    const spy = jest.spyOn(dao['entity'], 'findUnique');

    await dao.findByEmail(user.email);

    expect(spy).toHaveBeenCalledWith({
      where: {
        email: user.email,
      },
    });
  });

  test('Should call prisma update function with correct values', async () => {
    const dao = makeDAOImp();
    dao['entity'] = prismaMock.user;
    prismaMock.user.update.mockImplementationOnce(jest.fn());

    // eslint-disable-next-line dot-notation
    const spy = jest.spyOn(dao['entity'], 'update');

    const data = {
      where: {
        id: 1,
      },

      data: user,
    };

    await dao.update(data);

    expect(spy).toHaveBeenCalledWith(data);
  });

  test('Should call prisma delete function with correct values', async () => {
    const dao = makeDAOImp();
    dao['entity'] = prismaMock.user;
    prismaMock.user.delete.mockImplementationOnce(jest.fn());

    // eslint-disable-next-line dot-notation
    const spy = jest.spyOn(dao['entity'], 'delete');

    const data = {
      where: {
        id: 1,
      },
    };

    await dao.delete(data);

    expect(spy).toHaveBeenCalledWith(data);
  });

  test('Should throw Dependency Injection error if encrypter dependency is not configurable', async () => {
    try {
      jest.spyOn(factory, 'default').mockImplementation(jest.fn());
      makeDAOImp();
    } catch (err) {
      expect((err as Error).message).toEqual('Not possible injecting: Encrypter');
    }
  });
});
