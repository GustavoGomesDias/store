/* eslint-disable semi */
export default interface ImageStore {
  delete(url: string): Promise<string>
  saveImage(filepath: string): Promise<string>
}
