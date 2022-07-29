import ClothesModel from '@db/models/IClothesModel';
import { IsValidValue, LengthGreaterThanZero, Min } from '@validaions/index';

export default class ClothesDTO implements Omit<ClothesModel, 'id'> {
  @Min(8, 'Nome da roupa')
  public name: string;

  @IsValidValue('Valor da roupa')
  public value: number;

  @IsValidValue('Quantidade das roupas')
  public quantity: number;

  @LengthGreaterThanZero('imagem')
  public images: string[];

  constructor(name: string, value: number, quantity: number, images: string[]) {
    this.name = name;
    this.value = value;
    this.quantity = quantity;
    this.images = images;
  }
}
