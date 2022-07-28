import GenericDAOImp from '@DAO/prisma/PrismaGenericDAOImp';
import prisma from '@infra/PrismaConnection';
import { Prisma } from '@prisma/client';
import { AddClothes, ClothesWithoutId } from '@db/usecases/clothes';
import IClothesModel from '@db/models/IClothesModel';
import IClothesDAO from './IClothesDAO';

export default class ClothesDAOImp extends GenericDAOImp<
  AddClothes,
  Prisma.clothesFindUniqueArgs,
  Prisma.clothesUpdateArgs,
  number
> implements IClothesDAO<
  AddClothes,
  Prisma.clothesFindUniqueArgs,
  Prisma.clothesUpdateArgs,
  number
> {
  constructor() {
    super(prisma.clothes);
  }

  async addClothes(data: ClothesWithoutId): Promise<void> {
    const { images, ...rest } = data;
    await this.add({
      ...rest,
      images: {
        set: images,
      },
    });
  }

  async updateClothes(data: Partial<IClothesModel>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
