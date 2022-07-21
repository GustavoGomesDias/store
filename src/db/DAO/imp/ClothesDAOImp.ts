import GenericDAOImp from '@DAO/prisma/PrismaGenericDAOImp';
import prisma from '@infra/PrismaConnection';
import { Prisma } from '@prisma/client';
import { AddClothes } from '@db/usecases/clothes';

export default class ClothesDAOImp extends GenericDAOImp<
  AddClothes,
  Prisma.clothesFindUniqueArgs,
  Prisma.clothesUpdateArgs,
  Prisma.clothesDeleteArgs
> {
  constructor() {
    super(prisma.clothes);
  }
}
