import Encrypt from '@adapters/services/Encrypt';
import GenericDAOImp from '@DAO/prisma/PrismaGenericDAOImp';
import IUserModel from '@db/models/IUserModel';
import { AddUser, GetUserWithOutPass } from '@db/usecases/user';
import { DependencyError } from '@err/DependencyError';
import prisma from '@infra/PrismaConnection';
import { Inject } from '@inject/index';
import { Prisma } from '@prisma/client';
import IUserDAO from './IUserDAO';

@Inject(['Encrypter'])
export default class UserDAOImp extends GenericDAOImp<
  AddUser,
  Prisma.userFindManyArgs,
  Prisma.userUpdateArgs,
  Prisma.userDeleteArgs
> implements IUserDAO<
AddUser,
  Prisma.userFindManyArgs,
  Prisma.userUpdateArgs,
  Prisma.userDeleteArgs
> {
  private readonly encrypter: Encrypt;

  constructor(encrypter?: Encrypt) {
    super(prisma.user);
    this.encrypter = encrypter as Encrypt;
  }

  async findByEmail(email: string): Promise<GetUserWithOutPass> {
    const user = await this.findUnique({
      where: {
        email,
      },
    }) as unknown as IUserModel;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }

  async addUser(infos: AddUser): Promise<void> {
    const { password, ...rest } = infos;
    const hash = await this.encrypter.encrypt(password);
    await this.add({
      ...rest,
      password: hash,
    });
  }
}
