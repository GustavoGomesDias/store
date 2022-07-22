/* eslint-disable no-use-before-define */
import { Prisma, PrismaClient } from '@prisma/client';
import { mockReset, DeepMockProxy } from 'jest-mock-extended';

import prisma from '@infra/PrismaConnection';
import IUserModel from '@db/models/IUserModel';

const user: Omit<IUserModel, 'id'> = {
  name: 'Test',
  email: 'email@email.com',
  password: 'password',
};

const date = new Date(Date.now());

jest.mock('@infra/PrismaConnection', () => ({
  clothes: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findUnique: (data : Prisma.userFindUniqueArgs) => ({
      id: 1,
      ...user,
      createdAt: date,
      updatedAt: date,
    }),

    create: jest.fn(),

    update: jest.fn(),

    delete: jest.fn(),
  },
}));

const clothesMock = prisma as unknown as DeepMockProxy<PrismaClient>;

// beforeEach(() => {
//   mockReset(entityMock);
// });

export default clothesMock;
