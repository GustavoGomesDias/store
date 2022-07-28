import GenericDAOImp from '@DAO/prisma/PrismaGenericDAOImp';
import { AddCategory } from '@db/usecases/category';
import prisma from '@infra/PrismaConnection';
import { Prisma } from '@prisma/client';

export default class CategoryDAOImp extends GenericDAOImp<
  AddCategory,
  Prisma.categoryFindUniqueArgs,
  Prisma.categoryUpdateArgs,
  number
> {
  constructor() {
    super(prisma.category);
  }
}
