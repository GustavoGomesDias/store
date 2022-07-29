/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-extra-semi */

import GenericDAO from '@DAO/prisma/IGenericDAO';
import { AddUser, GetUserWithOutPass } from '@db/usecases/user';

export default interface IUserDAO<C = unknown, R = unknown, U = unknown, D = unknown> extends GenericDAO<C, R, U, D> {
  addUser(infos: AddUser): Promise<void>
  findByEmail(email: string): Promise<GetUserWithOutPass>
}
