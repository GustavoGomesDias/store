import WebTokenAdapter from '@adapters/services/WebToken';
import GenericDAO from '@db/DAO/generic/prisma/IGenericDAO';
import UserModel from '@db/models/IUserModel';
import { UnauthorizedError } from '@err/UnauthorizedError';
import { IRequest } from '@http/index';
import { Inject } from '@inject/Inject';
import HasAuthorization from '../decorators/validations/HasAuthorization';

@Inject(['UserDAOImp, WebToken'])
export default class Auth {
  private readonly userDAO: GenericDAO;

  private readonly authTokenService: WebTokenAdapter;

  constructor(userDAO?: GenericDAO, authTokenService?: WebTokenAdapter) {
    this.userDAO = userDAO as GenericDAO;
    this.authTokenService = authTokenService as WebTokenAdapter;
  }

  @HasAuthorization()
  async authentitcated(req: IRequest): Promise<Omit<UserModel, 'password'>> {
    const authorization = req.headers?.authorization as string;
    const [, token] = authorization.split(' ');

    const data = this.authTokenService.verify(token);
    const user = await this.userDAO.findById(data.id);

    if (!user) {
      throw new UnauthorizedError('Login requerido.');
    }

    return {
      ...data,
    };
  }
}
