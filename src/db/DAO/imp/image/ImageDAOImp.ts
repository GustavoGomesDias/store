import GenericDAOImp from '@db/DAO/generic/prisma/PrismaGenericDAOImp';
import prisma from '@db/infra/PrismaConnection';
import IImageModel from '@db/models/IImageModel';
import { Prisma } from '@prisma/client';
import IImageDAO from './IImageDAO';

export default class ImageDAOImp extends GenericDAOImp<
  Omit<IImageModel, 'id'>,
  Prisma.imagesFindUniqueArgs,
  Prisma.imagesUpdateArgs,
  number
> implements IImageDAO<
  Omit<IImageModel, 'id'>,
  Prisma.imagesFindUniqueArgs,
  Prisma.imagesUpdateArgs,
  number
> {
  constructor() {
    super(prisma.images);
  }

  async updateImage(data: Partial<IImageModel>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
