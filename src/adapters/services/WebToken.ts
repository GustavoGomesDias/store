/* eslint-disable semi */
import UserModel from '@models/IUserModel';

export default interface WebToken {
  sign(payload: Omit<UserModel, 'password'>, expiresIn: string | number): string
  verify(token: string): Omit<UserModel, 'password'>
}
