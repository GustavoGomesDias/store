import GenericDAO from './IGenericDAO';
import { IDelegate } from './IDelegate';

export default abstract class GenericDAOImp<
  C = unknown, R = unknown, U = unknown, D = unknown
  > implements GenericDAO<C, R, U, D> {
  protected entity: IDelegate;

  constructor(entity: IDelegate) {
    this.entity = entity;
  }

  async pagination(page: number): Promise<unknown> {
    const result = await this.entity.findMany({
      take: 6,
      skip: (6 * page),
    } as unknown as R);

    return result;
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
    await this.entity.delete({
      where: {
        id: data,
      },
    });
  }
}
