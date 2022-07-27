import ClothesModel from '@db/models/IClothesModel';
import { AddClothes } from '@db/usecases/clothes';
import { IResponse, IRequest } from '@http/index';
import {
  Route, Delete, Get, Post, Put, AuthRequired,
} from '@api/index';
import { Inject } from '@inject/index';
import GenericDAO from '@DAO/prisma/IGenericDAO';
import Catch from '@handleError/Catch';
import Controller from './Controller';

@Route('/clothes')
@Inject(['ClothesDAOImp'])
export default class ClothesController extends Controller<AddClothes, Partial<ClothesModel>> {
  constructor(enitityDAO?: GenericDAO) {
    super(enitityDAO as GenericDAO);
  }

  @Catch()
  @AuthRequired()
  @Post('/')
  async create(req: IRequest<AddClothes>): Promise<IResponse> {
    await this.enitityDAO.add(req.body);

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
