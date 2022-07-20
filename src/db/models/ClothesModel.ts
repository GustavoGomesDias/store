import CategoryModel from './CategoryModel';

/* eslint-disable semi */
export default interface ClothesModel {
  id: string | number
  value: number
  quantity: number
  name: number
  category: CategoryModel[]
}
