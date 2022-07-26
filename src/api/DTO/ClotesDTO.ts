import ClothesModel from '@db/models/IClothesModel';
import { Min } from '@validaions/index';

export default class ClothesDTO implements ClothesModel {
  public id: number;

  @Min(3, 'Nome da roupa')
  public name: string;

  public value: number;

  public quantity: number;

  public images: string[];

  constructor(id: number, name: string, value: number, quantity: number, images: string[]) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.quantity = quantity;
    this.images = images;
  }
}
