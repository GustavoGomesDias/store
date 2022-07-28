/* eslint-disable no-return-await */
import { IRequest } from '@http/IRequest';
import Auth from '@middlewares/Auth';

/**
 * @returns Notation for routes that need authentication
 */

export const AuthRequired = () => (target: any, key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const authMiddleware = new Auth();
    await authMiddleware.authentitcated(args[0] as IRequest);
    return await originalMethod.apply(this, args);
  };

  return descriptor;
};
