import { BadRequestErr } from '@err/BadRequestError';

/**
 *
 * @param property - Is value for print in message. It's better formatted if it comes in lowercase
 * @description - Check if array is greater than zero.
 */
export const LengthGreaterThanZero = (property: string) => function (target: Object, propertyKey: string) {
  let value: any[];
  const getter = function () {
    return value;
  };
  const setter = function (newVal: any[]) {
    if (newVal.length <= 0) {
      throw new BadRequestErr(`É preciso pelo menos um ${property}.`);
    } else {
      value = newVal;
    }
  };
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
};
