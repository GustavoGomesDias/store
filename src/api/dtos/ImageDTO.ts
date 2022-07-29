import { AddImages } from '@db/usecases/images';
import { IsUrl } from '@validaions/IsUrl';
import { IsValidValue } from '@validaions/IsValidValue';

export default class ImageDTO implements AddImages {
  @IsUrl()
  public imageUrl: string;

  @IsValidValue('Id da roupa')
  public clothesId: number;

  constructor(imageUrl: string, clothesId: number) {
    this.imageUrl = imageUrl;
    this.clothesId = clothesId;
  }
}
