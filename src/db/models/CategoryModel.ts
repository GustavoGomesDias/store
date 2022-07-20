// eslint-disable-next-line import/no-cycle
import ClothesModel from './ClothesModel';

/* eslint-disable semi */
export default interface CategoryModel {
  id: string | number
  name: string

  clothes?: ClothesModel[]
}
