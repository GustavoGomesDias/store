import WebTokenAdapter from '@adapters/services/WebToken';
import GenericDAO from '@db/DAO/generic/prisma/IGenericDAO';
import UserModel from '@db/models/IUserModel';
import { UnauthorizedError } from '@err/UnauthorizedError';
import { IRequest } from '@http/index';
import { Inject } from '@inject/Inject';

@Inject(['UserDAOImp', 'WebToken'])
export default class Auth {
  private readonly userDAO: GenericDAO;

  private readonly authTokenService: WebTokenAdapter;

  constructor(userDAO?: GenericDAO, authTokenService?: WebTokenAdapter) {
    this.userDAO = userDAO as GenericDAO;
    this.authTokenService = authTokenService as WebTokenAdapter;
  }

  async authentitcated(req: IRequest) {
    if (!(req).headers) {
      throw new UnauthorizedError('Login requerido.');
    }

    const { authorization } = req.headers as { [key: string]: string };

    if (!authorization) {
      throw new UnauthorizedError('Login requerido.');
    }

    const bearer = authorization.split(' ');
    if (bearer[0] !== 'Bearer') {
      throw new UnauthorizedError('Tipo do token inválido.');
    }

    const [, token] = authorization.split(' ');

    const data = this.authTokenService.verify(token);
    const user = await this.userDAO.findById(data.id);

    if (!user) {
      throw new UnauthorizedError('Login requerido.');
    }
  }
}
