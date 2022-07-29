import IImageModel from '@db/models/IImageModel';

export type AddImages = Omit<IImageModel, 'id'>;
export type EditImage = Partial<AddImages>
