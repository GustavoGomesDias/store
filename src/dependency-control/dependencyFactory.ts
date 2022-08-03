import * as DAO from '@DAOImp/index';
import BcryptService from '@services/BcryptService';
import CloudinaryService from '@services/CloudinaryService';
import WebTokenService from '@services/WebTokenService';
import Container from './Container';

export const dependencyFactory = (): void => {
  // Services
  Container.register('Encrypter', new BcryptService());
  Container.register('WebToken', new WebTokenService());
  Container.register('ImageStore', new CloudinaryService());

  // Persistence
  Container.register('ClothesDAOImp', new DAO.default.ClothesDAOImp());
  Container.register('ImageDAOImp', new DAO.default.ImageDAOImp());
  Container.register('CategoryDAOImp', new DAO.default.CategoryDAOImp());
  Container.register('CategorizesDAOImp', new DAO.default.CategorizesDAOImp());
  Container.register('UserDAOImp', new DAO.default.UserDAOImp());
};
