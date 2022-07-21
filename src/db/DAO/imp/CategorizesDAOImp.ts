import GenericDAOImp from '@DAO/prisma/PrismaGenericDAOImp';
import prisma from '@infra/PrismaConnection';
import CategorizesModel from '@models/CategorizesModel';
import { Prisma } from '@prisma/client';

export default class CategoryDAOImp extends GenericDAOImp<
  CategorizesModel,
  Prisma.categorizesFindUniqueArgs,
  Prisma.categorizesUpdateArgs,
  Prisma.categorizesDeleteArgs
> {
  constructor() {
    super(prisma.categorizes);
  }
}
