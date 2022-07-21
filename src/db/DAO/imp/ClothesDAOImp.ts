import GenericDAOImp from '@DAO/prisma/PrismaGenericDAOImp';
import prisma from '@infra/PrismaConnection';
import ClothesModel from '@models/ClothesModel';
import { Prisma } from '@prisma/client';

export default class ClothesDAOImp extends GenericDAOImp<
  ClothesModel,
  Prisma.clothesFindUniqueArgs,
  Prisma.clothesUpdateArgs,
  Prisma.clothesDeleteArgs
> {
  constructor() {
    super(prisma.clothes);
  }
}
