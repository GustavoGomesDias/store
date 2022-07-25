import { handleErrors } from '@err/handleErrors';
import { IResponse } from '@http/IReponse';

const Catch = () => (target: any, key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (err) {
      console.log(err);
      const { error, statusCode } = handleErrors(err as Error);

      return {
        statusCode,
        body: {
          error,
        },
      } as IResponse;
    }
  };

  return descriptor;
};

export default Catch;
