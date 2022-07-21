import bcrypt from 'bcrypt';
import Encrypt from '@adapters/services/Encrypt';

export default class BcryptService implements Encrypt {
  async compare(password: string, passHashed: string): Promise<boolean> {
    const result = await bcrypt.compare(password, passHashed);
    return result;
  }

  async encrypt(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 12);
    return hash;
  }
}
