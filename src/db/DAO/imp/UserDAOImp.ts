import MongoGenericDAOImp from '@DAO/MongoGenericDAOImp';
import UserModel from '@models/UserModel';

export default class UserDAOImp extends MongoGenericDAOImp<UserModel> {
  constructor() {
    super();
  }
}
