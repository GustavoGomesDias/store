import { BadRequestErr } from '@err/BadRequestError';
import { validateBase64Image } from '@helpers/validations';

/**
 *
 *  @description - Check if string is a valid Base64 information
 */

export const isBase64 = () => function (target: Object, propertyKey: string) {
  let value: string;
  const getter = function () {
    return value;
  };
  const setter = function (newVal: string) {
    if (!validateBase64Image(newVal)) {
      throw new BadRequestErr('Esta não é uma imagem válida.');
    } else {
      value = newVal;
    }
  };
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
};
