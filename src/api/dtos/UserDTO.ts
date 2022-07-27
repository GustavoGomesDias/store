import UserModel from '@models/IUserModel';
import { IsEmail } from '@validaions/IsEmail';
import { Min } from '@validaions/Min';
import { NotEmpty } from '@validaions/NotEmpty';

export default class UserDTO implements Omit<UserModel, 'id'> {
  @NotEmpty('Nome')
  public name: string;

  @IsEmail()
  public email: string;

  @Min(6, 'Senha de usuário')
  public password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
