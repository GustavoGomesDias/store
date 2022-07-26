import ClothesModel from '@db/models/IClothesModel';
import { IsValidValue, GreaterThanZero, Min } from '@validaions/index';

export default class ClothesDTO implements ClothesModel {
  @IsValidValue('Id da roupa')
  public id: number;

  @Min(8, 'Nome da roupa')
  public name: string;

  @IsValidValue('Valor da roupa')
  public value: number;

  @IsValidValue('Quantidade das roupas')
  public quantity: number;

  @GreaterThanZero('imagem')
  public images: string[];

  constructor(id: number, name: string, value: number, quantity: number, images: string[]) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.quantity = quantity;
    this.images = images;
  }
}
