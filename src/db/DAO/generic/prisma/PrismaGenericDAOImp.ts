import GenericDAO from './IGenericDAO';
import { IDelegate } from './IDelegate';

export default abstract class GenericDAOImp<C, R, U, D> implements GenericDAO<C, R, U, D> {
  protected entity: IDelegate;

  constructor(entity: IDelegate) {
    this.entity = entity;
  }

  async findById(id: number): Promise<unknown> {
    const result = await this.entity.findUnique({
      where: {
        id,
      },
    } as unknown as R);

    return result;
  }

  async add(data: C): Promise<unknown> {
    const result = await this.entity.create({
      data,
    });
    return result;
  }

  async findUnique(data: R): Promise<unknown> {
    const result = await this.entity.findUnique(data);
    return result;
  }

  async update(data: U): Promise<unknown> {
    const result = await this.entity.update(data);
    return result;
  }

  async delete(data: D): Promise<void> {
    await this.entity.delete(data);
  }
}
