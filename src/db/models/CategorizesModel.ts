import CategoryModel from './CategoryModel';
import ClothesModel from './ClothesModel';

/* eslint-disable semi */
export default interface CategorizesModel {
  id: number
  clothes?: ClothesModel[]
  category?: CategoryModel[]
}
