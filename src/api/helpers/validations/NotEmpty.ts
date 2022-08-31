import { BadRequestErr } from '@err/BadRequestError';
import { isInvalidField } from '@helpers/validations/index';

/**
 *
 * @param property - Is value for print in message.
 * @description - Check if value is empty
 */
export const NotEmpty = (property: string) => function (target: Object, propertyKey: string) {
  let value: string;
  const getter = function () {
    return value;
  };
  const setter = function (newVal: string) {
    if (isInvalidField(newVal)) {
      throw new BadRequestErr(`${property} é obrigatório.`);
    } else {
      value = newVal;
    }
  };
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
};
