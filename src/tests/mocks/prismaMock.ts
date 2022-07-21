/* eslint-disable no-use-before-define */
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import prisma from '@infra/PrismaConnection';

jest.mock('@infra/PrismaConnection', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
beforeEach(() => {
  mockReset(prismaMock);
});

export default prismaMock;
