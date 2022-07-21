/* eslint-disable no-use-before-define */
import GenericDAOImp from '@DAO/prisma/PrismaGenericDAOImp';
import { DeepMockProxy, mockReset } from 'jest-mock-extended';

jest.mock('@DAO/generic/prisma/PrismaGenericDAOImp', () => ({
  findById: jest.fn(),
  add: jest.fn(),
  findUnique: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

const prismaMock = GenericDAOImp as unknown as DeepMockProxy<GenericDAOImp<unknown, unknown, unknown, unknown>>;
beforeEach(() => {
  mockReset(prismaMock);
});

export default prismaMock;
