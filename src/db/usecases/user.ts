import UserModel from '@db/models/IUserModel';

export type AddUser = Omit<UserModel, 'id'>

export type GetUserWithOutPass = Omit<UserModel, 'password'>
