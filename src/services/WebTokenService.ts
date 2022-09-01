import jwt from 'jsonwebtoken';
import WebToken from '@services/adapters/services/WebToken';
import UserModel from '@db/models/IUserModel';
import { UnauthorizedError } from '@err/UnauthorizedError';

export default class WebTokenService implements WebToken {
  sign(payload: Omit<UserModel, 'password'>, expiresIn: string | number): string {
    return jwt.sign(payload, `${process.env.JWT_SECRET}` as string, {
      expiresIn,
    });
  }

  verify(token: string): Omit<UserModel, 'password'> {
    const payload = jwt.verify(token, `${process.env.JWT_SECRET}` as string, (err, decoded) => {
      if (err) {
        throw new UnauthorizedError('Token espirado.');
      }

      return decoded as Omit<UserModel, 'password'>;
    }) as unknown as Omit<UserModel, 'password'>;

    const { id, email, name } = payload;
    return {
      id,
      email,
      name,
    };
  }
}
