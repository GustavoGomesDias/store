/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-extra-semi */
import GenericDAO from '@DAO/prisma/IGenericDAO';
import { UpdateClotjes } from '@db/usecases/clothes';

export default interface IClothesDAO<C = unknown, R = unknown, U = unknown, D = unknown> extends GenericDAO<C, R, U, D> {
  updateClothes(data: UpdateClotjes): Promise<void>
}
