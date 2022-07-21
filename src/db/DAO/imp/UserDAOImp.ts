import GenericDAOImp from '@DAO/prisma/PrismaGenericDAOImp';
import prisma from '@infra/PrismaConnection';
import UserModel from '@models/UserModel';
import { Prisma } from '@prisma/client';

export default class UserDAOImp extends GenericDAOImp<
  UserModel,
  Prisma.userFindManyArgs,
  Prisma.userUpdateArgs,
  Prisma.userDeleteArgs
> {
  constructor() {
    super(prisma.user);
  }
}
