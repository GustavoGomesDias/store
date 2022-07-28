/* eslint-disable no-restricted-globals */
/* eslint-disable no-return-await */
import { BadRequestErr } from '@err/BadRequestError';
import {
  isEmptyObject, isObject, isValidObject, isInvalidField,
} from '@helpers/validations';
import { IRequest } from '@http/index';

/**
 * @description Check params is a valid numver
 */

export const IsValidNumberParams = (paramName: string) => (target: any, key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const { params } = args[0] as IRequest<Record<any, any>>;

    if (!isObject(params)) {
      throw new BadRequestErr('É preciso ter pelo menos 1 propriedade na requisição.');
    }

    if (isEmptyObject(params as Record<any, any>)) {
      throw new BadRequestErr('É preciso ter pelo menos 1 propriedade na requisição.');
    }

    if (!isValidObject(params as Record<any, any>)) {
      throw new BadRequestErr('É preciso ter pelo menos 1 propriedade na requisição.');
    }

    if (isNaN(params[paramName]) || params[paramName] < 0) {
      throw new BadRequestErr('É preciso ser um número maior ou igual a 0.');
    }

    return await originalMethod.apply(this, args);
  };

  return descriptor;
};
