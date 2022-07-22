import Container from '@DI/Container';
import makeEncrypter from '@mocks/services/encrypt';

export default () => {
  const encrypt = makeEncrypter();

  Container.register('Encrypter', encrypt);
};
