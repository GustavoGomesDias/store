/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-extra-semi */
export default interface GenericDAO<C = unknown, R = unknown, U = unknown, D = unknown> {
  add(data: C): Promise<unknown>
  findUnique(data: R): Promise<unknown>
  findById(id: number): Promise<unknown>
  update(data: U): Promise<unknown>
  delete(id: D): Promise<void>
  pagination(page: number): Promise<unknown>
};
