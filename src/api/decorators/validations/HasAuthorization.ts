/* eslint-disable no-return-await */
import { UnauthorizedError } from '@err/UnauthorizedError';
import { IRequest } from '@http/IRequest';

const HasAuthorization = () => (target: any, key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const { authorization } = (args[0] as IRequest).headers;

    if (!authorization) {
      throw new UnauthorizedError('Login requerido.');
    }

    return await originalMethod.apply(this, args);
  };

  return descriptor;
};

export default HasAuthorization;
