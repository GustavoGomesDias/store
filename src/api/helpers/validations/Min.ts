import { BadRequestErr } from '@err/BadRequestError';

/**
 *
 * @param limit - Is a minimum length for a valid value
 * @param property - Is value for print in message. It's better formatted if it comes in lowercase
 *  @description - Check if string length  greater than limit
 */

export const Min = (limit: number, property: string) => function (target: Object, propertyKey: string) {
  let value: string;
  const getter = function () {
    return value;
  };
  const setter = function (newVal: string) {
    if (newVal.length < limit) {
      throw new BadRequestErr(`O tamanho de ${property} precisa ser maior que ${limit}.`);
    } else {
      value = newVal;
    }
  };
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
};
