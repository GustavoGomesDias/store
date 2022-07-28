import GenericDAO from '@db/DAO/generic/prisma/IGenericDAO';
import { IResponse, IRequest } from '@http/index';

export default abstract class Controller<DAO = GenericDAO, CreateUseCase = unknown, UpdateUseCase = unknown> {
  protected enitityDAO: DAO;

  constructor(enitityDAO: DAO) {
    this.enitityDAO = enitityDAO;
  }

  abstract create (req: IRequest<CreateUseCase>): Promise<IResponse>;

  abstract update (req: IRequest<UpdateUseCase>): Promise<IResponse>;

  abstract delete(req: IRequest): Promise<IResponse>;

  abstract findById(req: IRequest): Promise<IResponse>;
}
