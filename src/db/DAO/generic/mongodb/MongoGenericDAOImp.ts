import { Collection, ObjectId } from 'mongodb';
import IGenericDAO from './IGenericDAO';

export default class MongoGenericDAOImp<Model> implements IGenericDAO<Model> {
  private readonly collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  async findAll(): Promise<Model[]> {
    const result = await this.collection.find({}).toArray() as unknown as Model[];
    return result;
  }

  async findById(id: number | string): Promise<Model> {
    const result = (await this.collection.find({ _id: new ObjectId((id as string).trim()) }).toArray())[0] as unknown as Model;
    return result;
  }

  async create(data: Record<any, any>): Promise<void> {
    await this.collection.insertOne({
      ...data,
      cretedAt: new Date(
        new Date().toLocaleString('en-US', {
          timeZone: 'America/Sao_Paulo',
        }),
      ),

      updatedAt: new Date(
        new Date().toLocaleString('en-US', {
          timeZone: 'America/Sao_Paulo',
        }),
      ),
    });
  }

  async update(data: Record<any, any>): Promise<void> {
    await this.collection.updateOne({ _id: new ObjectId(data.id.trim()) }, {
      $set: {
        ...data,
        updatedAt: new Date(
          new Date().toLocaleString('en-US', {
            timeZone: 'America/Sao_Paulo',
          }),
        ),
      },
    });
  }

  async delete(id: string | number): Promise<void> {
    await this.collection.deleteOne({ _id: new ObjectId((id as string).trim()) });
  }
}
