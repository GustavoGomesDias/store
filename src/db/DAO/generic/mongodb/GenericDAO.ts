/* eslint-disable semi */
export default interface GenericDAO<Model> {
  findAll(): Promise<Model[]>
  findById(id: number | string): Promise<Model>
  create(data: Record<any, any>): Promise<void>
  update(data: Record<any, any>): Promise<void>
  delete(id: number | string): Promise<void>
}
