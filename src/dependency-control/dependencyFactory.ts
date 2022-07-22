import * as DAO from '@DAOImp/index';
import Container from './Container';

export const dependencyFactory = (): void => {
  Container.register('ClothesDAOImp', new DAO.default.ClothesDAOImp());
};
