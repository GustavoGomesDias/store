import GenericDAO from '@db/DAO/generic/prisma/IGenericDAO';
import { IResponse, IRequest } from '@http/index';

export default abstract class Controller<CreateUseCase, UpdateUseCase> {
  protected enitityDAO: GenericDAO<unknown, unknown, unknown, unknown>;

  constructor(enitityDAO: GenericDAO<unknown, unknown, unknown, unknown>) {
    this.enitityDAO = enitityDAO;
  }

  abstract create (req: IRequest<CreateUseCase>): Promise<IResponse>;

  abstract update (req: IRequest<UpdateUseCase>): Promise<IResponse>;

  abstract delete(req: IRequest): Promise<IResponse>;

  abstract findById(req: IRequest): Promise<IResponse>;
}
