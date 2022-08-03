/* eslint-disable no-new */
import ImageStore from '@adapters/services/ImageStore';
import {
  AuthRequired, Delete, Get, Post, Put, Route,
} from '@api/index';
import IImageDAO from '@db/DAO/imp/image/IImageDAO';
import ImageDAOImp from '@db/DAO/imp/image/ImageDAOImp';
import { AddImages, EditImage } from '@db/usecases/images';
import ImageDTO from '@dtos/ImageDTO';
import Catch from '@handleError/Catch';
import { validateUrl } from '@helpers/validations';
import { IResponse } from '@http/IReponse';
import { IRequest } from '@http/IRequest';
import { Inject } from '@inject/Inject';
import { IsValidNumberParams } from '@validaions/index';
import Controller from './Controller';

@Route('/upload')
@Inject(['ImageDAOImp', 'ImageStore'])
export default class ImageController extends Controller<ImageDAOImp, AddImages, EditImage> {
  private imageStore: ImageStore;

  constructor(enitityDAO?: ImageDAOImp, imageStore?: ImageStore) {
    super(enitityDAO as ImageDAOImp);
    this.imageStore = imageStore as ImageStore;
  }

  @Catch()
  @AuthRequired()
  @Post('/')
  async create(req: IRequest<AddImages>): Promise<IResponse> {
    const { clothesId, image } = req.body as unknown as AddImages;
    new ImageDTO(image, clothesId);

    const imageUrl = await this.imageStore.saveImage(image as string);

    await this.enitityDAO.add({ imageUrl, clothesId: clothesId as number });

    return {
      statusCode: 201,
      body: {
        message: 'Imagem adicionada com sucesso!',
      },
    };
  }

  @Catch()
  @AuthRequired()
  @Put('/')
  async update(req: IRequest<AddImages>): Promise<IResponse> {
    const { clothesId, image } = req.body as unknown as AddImages;
    new ImageDTO(image, clothesId);

    if (validateUrl(image)) {
      await this.enitityDAO.updateImage({ imageUrl: image, clothesId });
    } else {
      const imageUrl = await this.imageStore.saveImage(image);
      await this.enitityDAO.updateImage({ imageUrl, clothesId });
    }

    return {
      statusCode: 200,
      body: {
        message: 'Imagem atualizada com sucesso!',
      },
    };
  }

  @Catch()
  @AuthRequired()
  @Delete('/:id')
  @IsValidNumberParams('id')
  async delete(req: IRequest<void>): Promise<IResponse> {
    const id = Number(req.params.id);
    await this.enitityDAO.delete(id);

    return {
      statusCode: 200,
      body: {
        message: 'Imagem deletada com sucesso!',
      },
    };
  }

  @Catch()
  @Get('/:id')
  @IsValidNumberParams('id')
  async findById(req: IRequest<void>): Promise<IResponse> {
    const id = Number(req.params.id);
    const image = await this.enitityDAO.findById(id) as IImageDAO;

    return {
      statusCode: 200,
      body: {
        content: image,
      },
    };
  }
}
