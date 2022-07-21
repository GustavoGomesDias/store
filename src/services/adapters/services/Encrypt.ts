export default interface Encrypt {
  encrypt(password: string): Promise<string>
  compare(password: string, passHashed: string): Promise<boolean>
// eslint-disable-next-line semi
}
