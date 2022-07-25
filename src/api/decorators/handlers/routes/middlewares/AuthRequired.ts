/* eslint-disable no-return-await */
import { IRequest } from '@http/IRequest';
import Auth from 'src/api/middlewres/Auth';

export const AuthRequired = () => (target: any, key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const authMiddleware = new Auth();
    authMiddleware.authentitcated(args[0] as IRequest);
    return await originalMethod.apply(this, args);
  };

  return descriptor;
};
