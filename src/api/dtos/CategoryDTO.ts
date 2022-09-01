import CategoryModel from '@models/ICategoryModel';
import { Min } from '../helpers/validations/Min';

export default class CategoryDTO implements Omit<CategoryModel, 'id'> {
  @Min(3, 'Nome da categoria')
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}
