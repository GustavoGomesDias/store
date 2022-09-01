import { BadRequestErr } from '@err/BadRequestError';
import { validateUrl } from '@helpers/validations';

/**
 *
 *  @description - Check if string is a valid URL
 */

export const IsUrl = () => function (target: Object, propertyKey: string) {
  let value: string;
  const getter = function () {
    return value;
  };
  const setter = function (newVal: string) {
    if (!validateUrl(newVal)) {
      throw new BadRequestErr(`${newVal} não é um link válido.`);
    } else {
      value = newVal;
    }
  };
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
};
