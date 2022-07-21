import GenericDAOImp from '@DAO/prisma/PrismaGenericDAOImp';
import prisma from '@infra/PrismaConnection';
import IUserModel from '@models/IUserModel';
import { Prisma } from '@prisma/client';

export default class UserDAOImp extends GenericDAOImp<
  IUserModel,
  Prisma.userFindManyArgs,
  Prisma.userUpdateArgs,
  Prisma.userDeleteArgs
> {
  constructor() {
    super(prisma.user);
  }
}
