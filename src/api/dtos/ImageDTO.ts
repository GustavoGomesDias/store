import { AddImages } from '@db/usecases/images';
import { isImage } from '@validaions/index';
import { IsValidValue } from '@validaions/IsValidValue';

export default class ImageDTO implements AddImages {
  @isImage()
  public image: string;

  @IsValidValue('Id da roupa')
  public clothesId: number;

  constructor(image: string, clothesId: number) {
    this.image = image;
    this.clothesId = clothesId;
  }
}
