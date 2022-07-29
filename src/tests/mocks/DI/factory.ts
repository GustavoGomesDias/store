import Container from '@DI/Container';
import clothesMock from '@mocks/DAO/clothesMock';
import userMock from '@mocks/DAO/userMock';
import makeEncrypterStub from '@mocks/services/encrypt';
import { makeWebTokenStub } from '@mocks/services/webToken';

export default () => {
  const encrypt = makeEncrypterStub();
  const webToken = makeWebTokenStub();
  // Services
  Container.register('Encrypter', encrypt);
  Container.register('WebToken', webToken);

  // Persistence
  Container.register('ClothesDAOImp', clothesMock);
  // Container.register('CategoryDAOImp', new DAO.default.CategoryDAOImp());
  // Container.register('CategorizesDAOImp', new DAO.default.CategorizesDAOImp());
  Container.register('UserDAOImp', userMock);
};
