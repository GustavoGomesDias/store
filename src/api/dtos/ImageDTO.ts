import { AddImages } from '@db/usecases/images';
import { isBase64 } from '@validaions/index';
import { IsValidValue } from '@validaions/IsValidValue';

export default class ImageDTO implements AddImages {
  @isBase64()
  public image: string;

  @IsValidValue('Id da roupa')
  public clothesId: number;

  constructor(image: string, clothesId: number) {
    this.image = image;
    this.clothesId = clothesId;
  }
}
