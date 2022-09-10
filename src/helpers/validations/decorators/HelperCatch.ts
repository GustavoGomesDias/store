/* eslint-disable consistent-return */
const HelperCatch = () => (target: any, key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (err) {
      // log
      console.log(err);
    }
  };

  return descriptor;
};

export default HelperCatch;
