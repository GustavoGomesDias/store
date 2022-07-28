import IClothesModel from '@models/IClothesModel';

export type ClothesWithoutId = Omit<IClothesModel, 'id'>

export interface AddClothes extends Omit<IClothesModel, 'id' | 'images'> {
  images: {
    set: string[]
  }
}

export type UpdateClotjes = Partial<IClothesModel>
