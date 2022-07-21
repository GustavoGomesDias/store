import GenericDAOImp from '@DAO/prisma/PrismaGenericDAOImp';
import prisma from '@infra/PrismaConnection';
import CategoryModel from '@models/CategoryModel';
import { Prisma } from '@prisma/client';

export default class CategoryDAOImp extends GenericDAOImp<
  CategoryModel,
  Prisma.categoryFindUniqueArgs,
  Prisma.categoryUpdateArgs,
  Prisma.categoryDeleteArgs
> {
  constructor() {
    super(prisma.category);
  }
}
