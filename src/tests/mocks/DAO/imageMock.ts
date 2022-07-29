/* eslint-disable no-use-before-define */
import { Prisma, PrismaClient } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';

import prisma from '@infra/PrismaConnection';
import IImageModel from '@db/models/IImageModel';

const image: Omit<IImageModel, 'id'> = {
  clothesId: 1,
  imageUrl: 'https://www.google.com/',
};

const date = new Date(Date.now());

jest.mock('@infra/PrismaConnection', () => ({
  images: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findUnique: (data : Prisma.imagesFindUniqueArgs) => ({
      id: 1,
      ...image,
      createdAt: date,
      updatedAt: date,
    }),

    create: jest.fn(),

    update: jest.fn(),

    delete: jest.fn(),
  },
}));

const imageMock = prisma as unknown as DeepMockProxy<PrismaClient>;

// beforeEach(() => {
//   mockReset(entityMock);
// });

export default imageMock;
