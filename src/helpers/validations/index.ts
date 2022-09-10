/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
export const isInvalidField = (field: unknown) => field === '' || field === ' ' || field === null || field === undefined;

export function isEmptyObject(obj: object) {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      return false;
    }
  }
  return true;
}

export const isEmptyList = (list: Array<any>) => list.length <= 0;

export const isObject = (obj: unknown) => typeof obj === 'object' && obj !== null && !Array.isArray(obj);

export const isValidObject = (obj: Record<any, any>) => {
  const keys = Object.keys(obj);

  for (const key of keys) {
    if (isObject(obj[key]) && isEmptyObject(obj[key])) {
      return false;
    }

    if (isInvalidField(obj[key])) {
      return false;
    }

    if (Array.isArray(obj[key]) && isEmptyList(obj[key])) {
      return false;
    }
  }

  return true;
};

export const validateUrl = (value: string) => /^(?:(?:(?:https?):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);

export const validateBase64Image = (image: string) => {
  const [type, base64Info] = image.split(',');

  const acceptedTypes = ['png', 'jpg', 'jpeg'];

  if (!acceptedTypes.some((value) => type.includes(value))) {
    return false;
  }

  const validation = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;

  return validation.test(base64Info);
};

export const validateMail = (email: string): boolean => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  return regex.test(email);
};
