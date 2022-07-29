import IClothesModel from '@models/IClothesModel';

export type AddClothes = Omit<IClothesModel, 'id'>

export type UpdateClotjes = Partial<IClothesModel>
