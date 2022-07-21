import GenericDAOImp from '@DAO/prisma/PrismaGenericDAOImp';
import { AddCategorizes } from '@db/usecases/categorizes';
import prisma from '@infra/PrismaConnection';
import { Prisma } from '@prisma/client';

export default class CategorizesDAOImp extends GenericDAOImp<
  AddCategorizes,
  Prisma.categorizesFindUniqueArgs,
  Prisma.categorizesUpdateArgs,
  Prisma.categorizesDeleteArgs
> {
  constructor() {
    super(prisma.categorizes);
  }
}
