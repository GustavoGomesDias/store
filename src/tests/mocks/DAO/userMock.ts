/* eslint-disable no-use-before-define */
import { Prisma, PrismaClient } from '@prisma/client';
import { any, CalledWithMock, DeepMockProxy } from 'jest-mock-extended';

import prisma from '@infra/PrismaConnection';
import IUserModel from '@db/models/IUserModel';
import UserDAOImp from '@DAOImp/user/UserDAOImp';

const user: Omit<IUserModel, 'id'> = {
  name: 'Test',
  email: 'email@email.com',
  password: 'password',
};

const date = new Date(Date.now());

jest.mock('@DAOImp/user/UserDAOImp', () => ({
  user: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findUnique: (data : Prisma.userFindUniqueArgs) => ({
      id: 1,
      ...user,
      createdAt: date,
      updatedAt: date,
    }),

    findById: async (id: number) => {
      const result = await Promise.resolve({
        id: 1,
        ...user,
        createdAt: date,
        updatedAt: date,
      });

      return result;
    },

    create: jest.fn(),

    update: jest.fn(),

    delete: jest.fn(),
  },
}));

const userMock = UserDAOImp as unknown as DeepMockProxy<UserDAOImp>;

// beforeEach(() => {
//   mockReset(entityMock);
// });

userMock.findById = (async (id: number) => {
  const result = await Promise.resolve({
    id: 1,
    ...user,
    createdAt: date,
    updatedAt: date,
  });

  return result;
}) as any;

export default userMock;
