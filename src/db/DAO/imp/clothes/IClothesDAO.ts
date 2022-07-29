/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-extra-semi */
import GenericDAO from '@DAO/prisma/IGenericDAO';
import { ClothesWithoutId, UpdateClotjes } from '@db/usecases/clothes';

export default interface IClothesDAO<C = unknown, R = unknown, U = unknown, D = unknown> extends GenericDAO<C, R, U, D> {
  addClothes(data: ClothesWithoutId): Promise<void>
  updateClothes(data: UpdateClotjes): Promise<void>
}
