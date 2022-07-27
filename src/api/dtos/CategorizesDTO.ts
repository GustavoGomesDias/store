import CategorizesModel from '@models/ICategorizesModel';
import { IsValidValue } from '@validaions/IsValidValue';

export default class CategorizesDTO implements Omit<CategorizesModel, 'id'> {
  @IsValidValue('Id da roupa')
  public clothesId: number;

  @IsValidValue('Id da categoria')
  public categoryId: number;

  constructor(clothesId: number, categoryId: number) {
    this.categoryId = categoryId;
    this.clothesId = clothesId;
  }
}
