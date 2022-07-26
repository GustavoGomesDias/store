/* eslint-disable no-return-await */
import { UnauthorizedError } from '@err/UnauthorizedError';
import { IRequest } from '@http/IRequest';

const HasAuthorization = () => (target: any, key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    if (!(args[0] as IRequest).headers) {
      throw new UnauthorizedError('Login requerido.');
    }

    const { authorization } = (args[0] as IRequest).headers as { [key: string]: string };

    if (!authorization) {
      throw new UnauthorizedError('Login requerido.');
    }

    const bearer = authorization.split(' ');
    if (bearer[0] !== 'Bearer') {
      throw new UnauthorizedError('Tipo do token inválido.');
    }

    return await originalMethod.apply(this, args);
  };

  return descriptor;
};

export default HasAuthorization;
