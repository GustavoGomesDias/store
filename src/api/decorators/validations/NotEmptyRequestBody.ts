/* eslint-disable no-return-await */
import { BadRequestErr } from '@err/BadRequestError';
import {
  isEmptyObject, isObject, isValidObject, isInvalidField,
} from '@helpers/validations';
import { IRequest } from '@http/index';

/**
 * @description Check if request body is empty
 */

export const NotEmptyRequestBody = () => (target: any, key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const { body } = args[0] as IRequest<Record<any, any>>;

    if (!isObject(body)) {
      throw new BadRequestErr('É preciso ter pelo menos 1 propriedade na requisição.');
    }

    if (isEmptyObject(body as Record<any, any>)) {
      throw new BadRequestErr('É preciso ter pelo menos 1 propriedade na requisição.');
    }

    if (!isValidObject(body as Record<any, any>)) {
      throw new BadRequestErr('É preciso ter pelo menos 1 propriedade na requisição.');
    }

    return await originalMethod.apply(this, args);
  };

  return descriptor;
};
