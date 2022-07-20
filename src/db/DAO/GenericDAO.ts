export default interface GenericDAO<Model> {
  findAll(): Promise<Model[]>
  findById(): Promise<Model>
  create(data: unknown): Promise<void>
  update(data: unknown): Promise<void>
  delete(id: number | string): Promise<void>
}