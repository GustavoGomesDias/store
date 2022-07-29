import GenericDAOImp from '@db/DAO/generic/prisma/PrismaGenericDAOImp';
import prisma from '@db/infra/PrismaConnection';
import { AddImages } from '@db/usecases/images';
import { Prisma } from '@prisma/client';

export default class ImageDAOImp extends GenericDAOImp<
  AddImages,
  Prisma.imagesFindUniqueArgs,
  Prisma.imagesUpdateArgs,
  number
> {
  constructor() {
    super(prisma.images);
  }
}
