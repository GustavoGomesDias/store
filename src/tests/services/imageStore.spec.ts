import CloudinaryService from '@services/CloudinaryService';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

describe('Cloudinary Service', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('Should call cloudinary delete function with correct value', async () => {
    jest.spyOn(cloudinary, 'config').mockImplementationOnce(jest.fn());
    const spy = jest.spyOn(cloudinary.uploader, 'destroy').mockImplementationOnce(async (publicKey: string) => {
      const result = await Promise.resolve(publicKey);

      return result;
    });

    const imageStore = new CloudinaryService();

    const url = 'https://res.cloudinary.com/dp8u89rei/image/upload/v1659115208/cld-sample-5.jpg';

    await imageStore.delete(url);

    expect(spy).toHaveBeenCalledWith('cld-sample-5');
  });

  test('Should call cloudinary upload function with correct value', async () => {
    jest.spyOn(cloudinary, 'config').mockImplementationOnce(jest.fn());
    const spy = jest.spyOn(cloudinary.uploader, 'upload').mockImplementationOnce(async (publicKey: string) => {
      await Promise.resolve(publicKey);

      return {
        public_id: 1,
      } as unknown as UploadApiResponse;
    });

    const imageStore = new CloudinaryService();

    const path = 'path/to/image.jpg';

    await imageStore.saveImage(path);

    expect(spy).toHaveBeenCalledWith(path);
  });
});
