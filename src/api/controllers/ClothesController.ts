import ClothesModel from '@db/models/IClothesModel';
import { AddClothes, ClothesWithoutId } from '@db/usecases/clothes';
import { IResponse, IRequest } from '@http/index';
import {
  Route, Delete, Get, Post, Put, AuthRequired,
} from '@api/index';
import { Inject } from '@inject/index';
import Catch from '@handleError/Catch';
import ClothesDTO from '@dtos/ClotesDTO';
import IClothesDAO from '@db/DAO/imp/clothes/IClothesDAO';
import Controller from './Controller';

@Route('/clothes')
@Inject(['ClothesDAOImp'])
export default class ClothesController extends Controller<IClothesDAO, ClothesWithoutId, Partial<ClothesModel>> {
  constructor(enitityDAO?: IClothesDAO) {
    super(enitityDAO as IClothesDAO);
  }

  @Catch()
  @AuthRequired()
  @Post('/')
  async create(req: IRequest<ClothesWithoutId>): Promise<IResponse> {
    // eslint-disable-next-line no-new
    new ClothesDTO(req.body?.name as string, req.body?.value as number, req.body?.quantity as number, req.body?.images as string[]);
    await this.enitityDAO.addClothes(req.body as ClothesWithoutId);

    return {
      statusCode: 201,
      body: {
        message: 'Roupa criada com sucesso!',
      },
    };
  }

  @Catch()
  @AuthRequired()
  @Put('/')
  async update(req: IRequest<Partial<ClothesModel>>): Promise<IResponse> {
    await this.enitityDAO.update(req.body);

    return {
      statusCode: 200,
      body: {
        message: 'Roupa atualizada com sucesso!',
      },
    };
  }

  @Catch()
  @AuthRequired()
  @Delete('/:id')
  async delete(req: IRequest): Promise<IResponse> {
    const id = Number(req.params.id);
    await this.enitityDAO.delete(id);

    return {
      statusCode: 200,
      body: {
        message: 'Roupa deletada com sucesso!',
      },
    };
  }

  @Catch()
  @Get('/:id')
  async findById(req: IRequest): Promise<IResponse> {
    const id = Number(req.params.id);
    const clothes = await this.enitityDAO.findById(id) as unknown as ClothesModel;

    return {
      statusCode: 200,
      body: {
        content: clothes,
      },
    };
  }

  @Catch()
  @Get('/page/:page')
  async pagination(req: IRequest): Promise<IResponse> {
    const page = Number(req.params.page);

    const clothes = await this.enitityDAO.pagination(page) as ClothesModel[];

    return {
      statusCode: 200,
      body: {
        content: clothes,
      },
    };
  }
}
