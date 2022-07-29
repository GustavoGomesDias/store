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
import { IResponse } from '@http/IReponse';
import { IRequest } from '@http/IRequest';
import { Inject } from '@inject/Inject';
import { IsValidNumberParams, NotEmptyRequestBody } from '@validaions/index';
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
    new ImageDTO(req.body?.image as string, req.body?.clothesId as number);

    const imageUrl = await this.imageStore.saveImage(req.body?.image as string);

    await this.enitityDAO.add({ imageUrl, clothesId: req.body?.clothesId as number });

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
  @NotEmptyRequestBody()
  async update(req: IRequest<Partial<AddImages>>): Promise<IResponse> {
    let imageUrl = '';
    let hasImage = false;
    if (req.body?.image) {
      hasImage = true;
      imageUrl = await this.imageStore.saveImage(req.body.image);
    }

    if (!hasImage) {
      await this.enitityDAO.updateImage(req.body as Partial<AddImages>);
    } else {
      await this.enitityDAO.updateImage({ imageUrl, clothesId: req.body?.clothesId });
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
