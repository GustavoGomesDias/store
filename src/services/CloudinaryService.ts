import ImageStore from '@adapters/services/ImageStore';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.API_CLOUDNARY_KEY,
  api_secret: process.env.API_CLOUDNARY_SECRET,
});

export default class CloudinaryService implements ImageStore {
  async delete(url: string): Promise<string> {
    const urlSplit: string[] = url.split('/');
    const publicId: string = urlSplit[urlSplit.length - 1].split('.')[0].trim();

    const result = await cloudinary.uploader.destroy(publicId);
    return result.result;
  }

  async saveImage(filepath: string): Promise<string> {
    const url = await cloudinary.uploader.upload(filepath);
    return url.url;
  }
}
