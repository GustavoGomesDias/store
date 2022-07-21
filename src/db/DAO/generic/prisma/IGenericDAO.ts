/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-extra-semi */
export default interface GenericDAO<C, R, U, D> {
  add(data: C): Promise<unknown>
  findUnique(data: R): Promise<unknown>
  findById(id: number): Promise<unknown>
  update(data: U): Promise<unknown>
  delete(id: D): Promise<void>
};
