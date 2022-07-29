import { AddImages } from '@db/usecases/images';
import { IsUrl } from '@validaions/IsUrl';
import { IsValidValue } from '@validaions/IsValidValue';

export default class ImageDTO implements AddImages {
  @IsUrl()
  public image: string;

  @IsValidValue('Id da roupa')
  public clothesId: number;

  constructor(image: string, clothesId: number) {
    this.image = image;
    this.clothesId = clothesId;
  }
}
