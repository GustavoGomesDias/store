import GenericDAO from '@DAO/prisma/IGenericDAO';
import IImageModel from '@models/IImageModel';

/* eslint-disable semi */
export default interface IImageDAO<C = unknown, R = unknown, U = unknown, D = unknown> extends GenericDAO<C, R, U, D> {
  updateImage(data: Partial<IImageModel>): Promise<void>
}
