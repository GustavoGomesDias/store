/* eslint-disable no-restricted-globals */
import { BadRequestErr } from '@err/BadRequestError';

/**
 *
 * @param property - Is value for print in message.
 * @description - Check if value is greater than 0
 */
export const IsValidValue = (property: string) => function (target: Object, propertyKey: string) {
  let value: number;
  const getter = function () {
    return value;
  };
  const setter = function (newVal: number) {
    if (newVal < 0) {
      throw new BadRequestErr(`${property} precisa ser maior que 0.`);
    } else if (isNaN(newVal)) {
      throw new BadRequestErr(`${property} precisa ser um número e maior que 0.`);
    } else {
      value = newVal;
    }
  };
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
};
